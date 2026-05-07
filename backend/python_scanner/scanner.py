import requests
import socket
from urllib.parse import urlparse

COMMON_PORTS = [21, 22, 80, 443, 3306]

def check_ports(host):
    open_ports = []

    for port in COMMON_PORTS:
        sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        sock.settimeout(1)

        result = sock.connect_ex((host, port))

        if result == 0:
            open_ports.append(port)

        sock.close()

    return open_ports


def scan_website(url):
    result = {
        "score": 100,
        "issues": [],
        "recommendations": [],
        "open_ports": []
    }

    try:
        parsed_url = urlparse(url)

        if not parsed_url.scheme:
            url = "http://" + url
            parsed_url = urlparse(url)

        host = parsed_url.netloc

        response = requests.get(url, timeout=5)

        headers = response.headers

        # HTTPS Check
        if parsed_url.scheme != "https":
            result["score"] -= 25
            result["issues"].append("Website is not using HTTPS")
            result["recommendations"].append("Enable HTTPS with SSL certificate")

        # Security Headers
        security_headers = {
            "Content-Security-Policy": "Add CSP header",
            "X-Frame-Options": "Add X-Frame-Options header",
            "Strict-Transport-Security": "Enable HSTS header"
        }

        for header, recommendation in security_headers.items():
            if header not in headers:
                result["score"] -= 10
                result["issues"].append(f"Missing {header}")
                result["recommendations"].append(recommendation)

        # Server Disclosure
        if "Server" in headers:
            result["score"] -= 10
            result["issues"].append(
                f"Server information exposed: {headers['Server']}"
            )
            result["recommendations"].append(
                "Hide server version information"
            )

        # Cookie Security
        cookies = response.cookies

        for cookie in cookies:
            if not cookie.secure:
                result["score"] -= 5
                result["issues"].append(
                    f"Cookie '{cookie.name}' is not Secure"
                )
                result["recommendations"].append(
                    "Use Secure cookies"
                )

        # Port Scan
        open_ports = check_ports(host)

        result["open_ports"] = open_ports

        dangerous_ports = [21, 22, 3306]

        for port in open_ports:
            if port in dangerous_ports:
                result["score"] -= 10
                result["issues"].append(f"Potentially risky port open: {port}")
                result["recommendations"].append(
                    f"Close unused port {port}"
                )

        # Admin Pages Check
        admin_paths = ["/admin", "/login", "/dashboard"]

        for path in admin_paths:
            try:
                admin_url = url + path
                admin_response = requests.get(admin_url, timeout=3)

                if admin_response.status_code == 200:
                    result["issues"].append(
                        f"Accessible admin-related page found: {path}"
                    )

            except:
                pass

        # Prevent negative score
        if result["score"] < 0:
            result["score"] = 0

        return result

    except Exception as e:
        return {
            "score": 0,
            "issues": [f"Error scanning website: {str(e)}"],
            "recommendations": [],
            "open_ports": []
        }