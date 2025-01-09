export function getFileInputAs(elem: HTMLInputElement): Promise<any> {
    return new Promise((resolve, reject) => {
        const file = elem.files?.[0];
        if (!file) {
            reject('File not found')
        }

        const reader = new FileReader();
        reader.onload = (event) => {
            const json = event.target?.result as string;
            const info = JSON.parse(json); 
            resolve({ value: info, file: file });
        };
        reader.readAsText(file as File);
        //timer.end('runPromise')
    })
}
