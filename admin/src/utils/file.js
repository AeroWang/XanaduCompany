let uid=100000
import { setStyle } from "element-ui/src/utils/dom"
export function setDefaultFile(vm, url) {
    fetch(url).then(res => res.blob()).then(blob => {
        const filename = url.split("/").at(-1);
        const file = new File([blob], filename);
        let hasBlobFile =true
        const blobUrl = URL.createObjectURL(blob);
        const data = {
            name: filename,
            percentage: 0,
            raw: file,
            size: file.size,
            status: "success",
            uid: uid++,
            url:blobUrl
        }
        if (!Array.isArray(vm.uploadFiles)) {
            vm.uploadFiles = [];
        }
        vm.uploadFiles.push(data)
        const el = vm.$el.lastChild;
        setStyle(el, 'display', 'none')
        vm.$watch("uploadFiles.length", function (val) {
            if (!val) {
                setStyle(el,'display','')
            }
            if (hasBlobFile) {
                URL.revokeObjectURL(blobUrl);
                hasBlobFile = false;
            }
        })
    })
}