<!-- 弹出自选套餐详情-->
<template>
    <FoodOptionalDetail
       :dishes="dishes"
       @addCart="addCart"
    ></FoodOptionalDetail>
</template>
<script>
import FoodOptionalDetail from "../../../components/FoodOptionalDetail";
export default {
    name: "CartDishOptionalDetail",
    components: {
        FoodOptionalDetail
    },
    props: {
        dishes: {
            type: Object,
            default: null
        }
    },
    computed: {
        getDishNum(dish_id) {
            return function(dish_id) {
                return this.$store.getters.dishNums[dish_id] | 0;
            };
        },
        language: {
            get() {
                return this.$store.getters.language;
            }
        }
       
        
    },
    data() {
        return {
           

            
        };
    },
    methods: {
       addCart(){
         
            this.$emit(
                "addCart",
                this.dishes,
                this.dish_price,
                this.member_price,
                false,
        
            );
                
            
        }
        
    },
};
</script>

<style scoped>

</style>