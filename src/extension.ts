import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
    const goTestDecorationType = vscode.window.createTextEditorDecorationType({
        backgroundColor: 'rgba(0, 128, 0, 0.3)',
    });

    const activeEditor = vscode.window.activeTextEditor;
    if (activeEditor) {
        triggerUpdateDecorations(activeEditor, goTestDecorationType);
    }

    vscode.window.onDidChangeActiveTextEditor(editor => {
        if (editor) {
            triggerUpdateDecorations(editor, goTestDecorationType);
        }
    }, null, context.subscriptions);

    vscode.workspace.onDidChangeTextDocument(event => {
        if (activeEditor && event.document === activeEditor.document) {
            triggerUpdateDecorations(activeEditor, goTestDecorationType);
        }
    }, null, context.subscriptions);
}

function triggerUpdateDecorations(editor: vscode.TextEditor, decorationType: vscode.TextEditorDecorationType) {
    if (editor.document.languageId === 'go' && editor.document.fileName.endsWith('_test.go')) {
        const range = new vscode.Range(new vscode.Position(0, 0), new vscode.Position(0, 1));
        editor.setDecorations(decorationType, [range]);
    }
}

export function deactivate() {}
