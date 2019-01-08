
  $(document).ready(function() {

    $('#calendar').fullCalendar({
      header: {
        left: 'prev,next today',
        center: 'title',
        right: 'month,agendaWeek,agendaDay,listWeek'
      },
      editable: true,
      navLinks: true, // can click day/week names to navigate views
      eventLimit: true,
      eventRender: function(event, element) {
          var itemtitle = event.consumerName + event.startDate
          var itemcontent = 'End time:' + event.endDate + 'Address:' + event.address  + 'Status:' + event.status + 'Project ID:' + event.projectId + 'Supplier Name :' + event.supplierName + 'Supplier ID :' + event.supplierId + 'Rate :' + event.hourlyWage + 'Payload :' + event.totalPaidAmount 
        //   let element = $(this)
         $(element).popover({
             title: itemtitle,
             content: itemcontent,
             trigger:'hover',
             container:'body',
             placement:'top'
         })
  },
     eventSources:[
           {
           url: 'https://cors-anywhere.herokuapp.com/'+'http://test.hellotoby.com:8889/api/admin/schedule',
           type:"GET",
           data:{},
        error: function() {
          $('#script-warning').show();
        },
        color:'lightblue'
      }
    ],
 


    });


   



    $( "#scheduletype" ).change(function() {
        var selected= this.value
  if (selected == 'CL Availability'){
       document.getElementById('requestid').style.display ='none';
   
     }else {
    document.getElementById('requestid','customerphone','orderstatus').style.display = ""}
    });

    $( "#scheduletype" ).change(function() {
        var selected= this.value
  if (selected == 'CL Availability'){
       document.getElementById('customerphone').style.display ='none';
   
     }else {
    document.getElementById('customerphone').style.display = ""}
    });

    $( "#scheduletype" ).change(function() {
        var selected= this.value
  if (selected == 'CL Availability'){
       document.getElementById('orderstatus').style.display ='none';
   
     }else {
    document.getElementById('orderstatus').style.display = ""}
    });


    $('#en_form').on('submit',function(event){
        event.preventDefault()
          var that = $(this),
                url = that.attr('action'),
                method = that.attr('method')
                data ={};   

                that.find('[name]').each(function(index,value){
                var that = $(this),
                name = that.attr('name'),
                value  = that.val();

                data[name] = value;
                console.log(data)
                
                });

                var projectId = data.requestidnum
                var supplierId = data.supplierid
                var cors = 'https://cors-anywhere.herokuapp.com/'
                // function getDate(date){
                //  var nowdate = new Date(date),
                //      month = '' + (nowdate.getMonth() + 1),
                //      day = '' + nowdate.getDate(),
                //      year = nowdate.getFullYear();
                //      [year, month, day].join('-')

                //      if (month.length < 2) month = '0' + month;
                //      if (day.length < 2) day = '0' + day;

                //      return  [year, month, day].join('-')
                  
                //      }

                // function getFinDate(date, days) {
                // var result = new Date(date);
                // return result.setDate(result.getDate() + days); 
                // }
               

                // var date = new Date()
                // var currentDate = getDate(date)
                // var finishDate = getDate(getFinDate(date,61))
     

                  if (supplierId.length > 0){
                    var queryurl = cors + "http://test.hellotoby.com:8889/api/admin/schedule?supplierId=" + supplierId
 
                       $('#calendar').fullCalendar('destroy')
                        $('#calendar').fullCalendar({
                            navLinks:true,
                               eventRender: function(event, element) {
                             var itemtitle = event.consumerName + "\n" + event.startDate
                             var itemcontent = 'End time:' + event.endDate + 'Address:' + event.address  + 'Status:' + event.status + 'Project ID:' + event.projectId + 'Supplier Name :' + event.supplierName + 'Supplier ID :' + event.supplierId + 'Rate :' + event.hourlyWage + 'Payload :' + event.totalPaidAmount 
                     
                         $(element).popover({
                         title: itemtitle,
                         content: itemcontent,
                         trigger:'hover',
                         container:'body',
                          placement:'top'
         })
  },
                           eventSources:[{
                               url:queryurl,
                               type:"GET",
                                data:{},
                                 error: function() {
                                     $('#script-warning').show();
                                         },

                           }]
                                        
                   })
                     $('#en_form')[0].reset()
                }

          
                
                if (projectId.length > 0){
                    var queryurl2 = cors + "http://test.hellotoby.com:8889/api/admin/schedule?projectId=" + projectId
                    // +currentDate + "&end=" + finishDate + "&projectId=" + projectId
           
                       $('#calendar').fullCalendar('destroy')
                       $('#calendar').fullCalendar({
                           navLinks:true,
                              eventRender: function(event, element) {
                                var itemtitle = event.consumerName + "\n" + event.startDate
                                var itemcontent = 'End time:' + event.endDate + 'Address:' + event.address  + 'Status:' + event.status + 'Project ID:' + event.projectId + 'Supplier Name :' + event.supplierName + 'Supplier ID :' + event.supplierId + 'Rate :' + event.hourlyWage + 'Payload :' + event.totalPaidAmount 
                                //   let element = $(this)
                                $(element).popover({
                                    title: itemtitle,
                                    content: itemcontent,
                                    trigger:'hover',
                                    container:'body',
                                    placement:'top'
         })
  },
                           eventSources:[{
                               url:queryurl2,
                               title:'hi mother',
                               type:"GET",
                                data:{},
                                
                                 error: function() {
                                     $('#script-warning').show();
                                         },
                           }],
                           
                       })
                    
                       $('#en_form')[0].reset()
                }

                                
              
                
          return false


          
    })
/*
    $('#submit').click(function(){
        window.location.reload(true);
    })

   */
  });
   
  