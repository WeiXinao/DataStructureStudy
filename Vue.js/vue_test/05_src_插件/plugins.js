export default {
    install(app, x, y, z) {
        console.log(x, y, z); // 1 2 3
        // 定义全局指令
        app.directive('fbind', {
        // 钩子
        // 指令和元素成功绑定时（一上来）
        created(element, binding) {
            element.value = binding.value;
        },
        // 指令所在元素被插入页面时
        mounted(element) {
            element.focus();
        },
        // 指令所在的模板被重新解析时。
        updated(element, binding) {
            element.value = binding.value;
        }});
        
        // 定义混入
        app.mixin({
            data() {
                return {
                    x: 100,
                    y: 200
                }
            }
        });
    }
}