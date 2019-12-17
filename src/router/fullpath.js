
export default [{
        path:'/',
        component: (resolve) => require(['../components/Index.vue'], resolve),
        children:[
          {
            path:'/Hello',
            component: (resolve) => require(['../components/HelloWorld.vue'], resolve)
          },
          {
            path: '/OPCConfig',
            component: (resolve) => require(['../components/OPCConfig.vue'], resolve)
          },
          {
            path: '/AST',
            component: (resolve) => require(['../components/AST.vue'], resolve)
          },
          {
            path: '/TagUpload',
            component: (resolve) => require(['../components/TagUpload.vue'], resolve)
          },
          {
            path: '/AlarmFrequency',
            component: (resolve) => require(['../components/AlarmFrequencyView.vue'], resolve),
            children:
              [ 
                { path:'Chart', component:(resolve) => require(['../components/AlarmFrequencyChart.vue'], resolve) },
                { path:'ByArea',  component:(resolve) => require(['../components/AlarmFrequencyByAreaChart.vue'], resolve) }
              ]
          },
          {
            path: '/AlarmFrequencyDrilldown',
            component: (resolve) => require(['../components/AlarmFrequencyUsingEvent.vue'], resolve)
          },
        ]
      }]

      //new comments


//new comments3