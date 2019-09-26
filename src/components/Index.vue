  <template>
     <el-container>
        <el-header class="header">header</el-header>
        <el-container>
        <el-aside class="aside">
        <el-row class="tac">
            <el-col>
            <span style="display:inline-block;padding-left:15px;"><h5>System Menu</h5></span>
            <SideMenu />
            </el-col>
        </el-row>
        </el-aside>
        <el-main id="contentArea"  class="main">
            <router-view >
            </router-view>
        </el-main>
        </el-container>
        <el-footer class="footer" >footer</el-footer>
    </el-container>
  </template>

<script>
import SideMenu from '@/components/SideMenu.vue'


export default {
    name:'Index',
    components:{SideMenu},
  mounted:function() {
    //this.$router.push('/'); //强制去主页

    /**
     * 
     * 
     * router.go(n)
        这个方法的参数是一个整数，意思是在 history 记录中向前或者后退多少步，类似 window.history.go(n)

        router.push(location)
        想要导航到不同的 URL，则使用 router.push 方法。这个方法会向 history 栈添加一个新的记录，所以，当用户点击浏览器后退按钮时，则回到之前的 URL。

        router.replace(location)
        跟 router.push 很像，唯一的不同就是，它不会向 history 添加新记录，而是跟它的方法名一样 —— 替换掉当前的 history 记录。
     * 
     */
  },
  created() {

    
  }
}
</script>


<style scoped>
  .header
  {
    background-color:aliceblue;
  }

  .main
  {
    background-color: white;
  }

  .footer
  {
    background-color: aliceblue;
  }

  .aside
  {
    background-color: whitesmoke;
  }
</style>
 