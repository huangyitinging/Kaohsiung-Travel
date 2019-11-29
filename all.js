var app = new Vue({
    el:'#app',
    data:{
        data:[],
        currentPage:0,
        locations:[],
        currentLocation:'',
    },
    methods:{
        getUniqueList(){
            const locations = new Set(); //用 Set 來取得陣列不重複的內容
            const vm = this;
            vm.data.forEach((item,i)=>{
                locations.add(item.Zone) //配合 Set 用 add 而不是用 push
            })
            console.log(locations)
            vm.locations = Array.from(locations) //用 Array 將類陣列轉為陣列
        }
    },
    computed:{
        filterData(){
            const vm = this;
            //先過濾
            let items =[];
            if(vm.currentLocation !== ''){  //當有選擇區域後
                items = vm.data.filter((item,i)=>{
                    console.log(item);
                    return item.Zone == vm.currentLocation  // filter 會將回傳為 true 的值傳回 items
                })
            }else{
                items = vm.data
            }
            //有幾頁
            //每頁的資料內容
            //newData = [[1..],[2..],[3...]]
            console.log(vm.currentLocation)
            const newData = []
            items.forEach((item,i)=>{
                if(i % 10 ===0){  // % 取餘數的概念，每當取一個餘數就會新增一個空陣列 
                    newData.push([])
                }
                const page = parseInt(i/10) //在每一個整數時，會推進一個頁數 //用來產生分頁數 (目前第幾頁)
                newData[page].push(item) //將指定的頁面加入 (第 x 頁的內容)
            })
            
            console.log(newData)
            return newData;
        }
    },
    created(){
        const vm = this;
        axios.get('https://data.kcg.gov.tw/api/action/datastore_search?resource_id=92290ee5-6e61-456f-80c0-249eae2fcc97')
        .then(response => {
        console.log(response);
        vm.data = response.data.result.records;
        console.log(vm.data);
        vm.getUniqueList();
        })
        .catch(error => {
        console.log(error)
        })
    }
})