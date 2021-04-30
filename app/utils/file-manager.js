export function getFile(component, request, fileName) {
    component.send(
        'downloadFile',
        component.get('model'),
        request,
        "text/plain;charset=utf-8",
        fileName
    );
}