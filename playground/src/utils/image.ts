export function readImage(files: FileList): Promise<string|ArrayBuffer|null> {
    return new Promise((res, rej) => {
        const reader = new FileReader();
        try {
            reader.readAsDataURL(files[0]);
            reader.onload = e =>{
                let imageResult = e.target!.result;
                res(imageResult)
            };
        } catch {
            rej("Error reading image")
        }
    })
    
}