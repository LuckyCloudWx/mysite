import request from './request'

export default async function getData(){
    const resp = await request.get('/api/banner');
    return resp;
}