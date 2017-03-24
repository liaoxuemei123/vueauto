export default function loadListen(){
    return store => {
        store.subscribe(mutation=>{
            if(mutation.type == 'LOAD_DOWN'){
                
            }
        })
    }
}