export default function (refedDom){
    return{
        mounted(){
            window.eventBus.$on('setScroll',this.handleSetScroll);
            this.$refs[refedDom].addEventListener('scroll',this.handleScroll);
        },
        beforeDestroy(){
            window.eventBus.$emit('mainScroll')
            window.eventBus.$off('setScroll',this.handleSetScroll);
            this.$refs[refedDom].removeEventListener('scroll',this.handleScroll);
        },
        methods:{
            handleSetScroll(top){
                this.$refs[refedDom].scrollTop = top;
            },
            handleScroll(){
                window.eventBus.$emit('mainScroll',this.$refs[refedDom])
            }
        }
    }
}