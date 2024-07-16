import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
    const goTestDecorationType = vscode.window.createTextEditorDecorationType({
        backgroundColor: new vscode.ThemeColor('goTestFileDecoration.background')
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
        const editor = vscode.window.activeTextEditor;
        if (editor && event.document === editor.document) {
            triggerUpdateDecorations(editor, goTestDecorationType);
        }
    }, null, context.subscriptions);
}

function triggerUpdateDecorations(editor: vscode.TextEditor, decorationType: vscode.TextEditorDecorationType) {
    if (editor.document.languageId === 'go' && editor.document.fileName.endsWith('_test.go')) {
        const ranges: vscode.DecorationOptions[] = [];
        const text = editor.document.getText();
        const regEx = /./g;
        let match;
        while (match = regEx.exec(text)) {
            const startPos = editor.document.positionAt(match.index);
            const endPos = editor.document.positionAt(match.index + match[0].length);
            const range = new vscode.Range(startPos, endPos);
            ranges.push({ range });
        }
        editor.setDecorations(decorationType, ranges);
    } else {
        editor.setDecorations(decorationType, []);
    }
}

export function deactivate() {}
