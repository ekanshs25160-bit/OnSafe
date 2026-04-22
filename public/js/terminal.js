document.addEventListener('DOMContentLoaded', () => {
    const output = document.getElementById('terminal-output');
    const input = document.getElementById('terminal-input');
    
    // Initial Message
    printLine(terminalSettings.welcomeMessage, 'system');

    input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            const command = input.value.trim().toLowerCase();
            input.value = '';
            
            // Log user command
            printLine(`> ${command}`, 'user');
            
            // Process Command
            processCommand(command);
        }
    });

    function printLine(text, type = '') {
        const line = document.createElement('div');
        line.className = `terminal-line ${type}`;
        line.textContent = text;
        output.appendChild(line);
        output.scrollTop = output.scrollHeight;
    }

    function processCommand(cmd) {
        switch (cmd) {
            case 'help':
                for (const [key, val] of Object.entries(terminalSettings.commands)) {
                    printLine(`${key}: ${val}`, 'success');
                }
                break;
            case 'about':
                printLine("SCS is a digital innovation agency dedicated to creating state-of-the-art experiences.", "success");
                break;
            case 'enter':
                printLine("Redirecting to system_access_v1...", "system");
                setTimeout(() => {
                    transitionToPage('home.html');
                }, 1000);
                break;
            case 'clear':
                output.innerHTML = '';
                break;
            case 'whoami':
                printLine(`User: ${terminalSettings.username} | Host: ${terminalSettings.hostname} | Status: AUTHORIZED`, "success");
                break;
            case '':
                break;
            default:
                printLine(`Command not found: ${cmd}. Type 'help' for available commands.`, 'error');
                break;
        }
    }
});

function transitionToPage(url) {
    // Basic transition logic, will be expanded in transition.js
    window.location.href = url;
}
