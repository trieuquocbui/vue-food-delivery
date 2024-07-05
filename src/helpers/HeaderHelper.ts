// 'application/json'
const myHeaders = new Headers();

const header = (type: string,token:string | null) => {
    myHeaders.append('Content-Type', type);
    if(token){
        myHeaders.append('Authorization', token);
    }
    return myHeaders;
}
export default header;