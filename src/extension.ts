import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
    // Define a new file decoration provider
    const fileDecorationProvider: vscode.FileDecorationProvider = {
        provideFileDecoration(uri: vscode.Uri): vscode.ProviderResult<vscode.FileDecoration> {
            if (uri.path.endsWith('_test.go')) {
                return {
                    badge: 'T', // Optional: Adds a badge to the file icon
                    color: new vscode.ThemeColor('goTestFileDecoration.background'),
                    tooltip: 'Go Test File'
                };
            }
        }
    };

    // Register the file decoration provider
    const disposable = vscode.window.registerFileDecorationProvider(fileDecorationProvider);
    context.subscriptions.push(disposable);
}

export function deactivate() {}