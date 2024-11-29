export default function(originData = null){
    return {
        data(){
            return{
                loaded:false,
                data:originData
            }
        },
        async created(){
            this.data = await this.fetchedData();
            this.loaded = true;
        }
    }
}