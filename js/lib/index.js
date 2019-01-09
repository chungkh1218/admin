
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
      selectable: true, 
    //   select: function (start, end, allDay) {
    //         $('#createEventModal').modal('show');
    //     },
        // eventRender: function(event, element) {
        //     $(element).tooltip({title: event.title});             
        // },

        //Activating modal for 'when an event is clicked'
        eventClick: function (event) {
            $('#modalTitle').html(event.title);
            $('#modalBody').html(event.description);
            $('#fullCalModal').modal();
        },
   

      eventRender: function(event, element) {
        
          var itemtitle =event.startDate + event.consumerName 
          var itemcontent = 'End time:' + event.endDate + 'Address:' + event.address  + 'Status:' + event.status + 'Project ID:' + event.projectId + 'Supplier Name :' + event.supplierName + 'Supplier ID :' + event.supplierId + 'Rate :' + event.hourlyWage + 'Payload :' + event.totalPaidAmount 
          var removetitle = 'Request ID:' + event.projectId
     
        $(element).find('.fc-title').text(function(i, t) {
            return t.replace(event.title,itemtitle)
            }); 
         $(element).popover({
             title: itemtitle,
             content: itemcontent,
             animation:true,
             trigger:'hover',
             container:'body',
             placement:'top'
         })
        $('.loader').hide()
         
  },

    
    eventClick: function(event){
        var selected= event
        var detailpage = window.open('./detailpage.html')
           if (event.url){
            console.log(selected.projectId)  
            window.open('./detailpage.html')
            return false
           }
           

         

            
            
             
                   

    },
     eventSources:[
           {
           url: 'https://cors-anywhere.herokuapp.com/'+'http://test.hellotoby.com:8889/api/admin/schedule',
           title : "hello",
           type:"GET",
           data:{},
            
        error: function() {
          $('#script-warning').show();
        },
        color:'lightblue'
      }
    ],
 


    });

$('#addevent').click(function(){
     $('#createEventModal').modal('show')
});
   
 $('#submitButton').on('click', function(e){
            
            e.preventDefault();

            doSubmit();
          });

      function doSubmit(){
        $("#createEventModal").modal('hide');
        $("#calendar").fullCalendar('renderEvent',
            {
                title: $('#eventName').val(),
                start: new Date($('#eventDueDate').val()),

            },
            true);
       }
       


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
                
                var scheduletype = $('#scheduletype option:selected').text();
                console.log(scheduletype)
               
     

                    var queryurl = cors + "http://test.hellotoby.com:8889/api/admin/schedule?supplierId=" + supplierId +"&projectId=" +projectId
 
                       $('#calendar').fullCalendar('destroy')
                   
                       
                        $('#calendar').fullCalendar({
                            navLinks:true,
                            eventRender: function(event, element) {
                                if (scheduletype == 'CL Booked Schedule'){
                                var itemtitle =  event.startDate +event.supplierName
                                } else {
                                var itemtitle =  event.startDate + event.consumerName 
                                }
                                

                                console.log(itemtitle)
                             var itemcontent = 'End time:' + event.endDate + 'Address:' + event.address  + 'Status:' + event.status + 'Project ID:' + event.projectId + 'Supplier Name :' + event.supplierName + 'Supplier ID :' + event.supplierId + 'Rate :' + event.hourlyWage + 'Payload :' + event.totalPaidAmount 

                         $(element).find('.fc-title').text(function(i, t) {
            return t.replace(event.title,itemtitle)
            }); 


                         $(element).popover({
                         title: itemtitle,
                         content: itemcontent,
                         trigger:'hover',
                         container:'body',
                         placement:'top'
         })
  },
         eventClick: function(event){
        if (event.url){
            window.open('./detailpage.html')
            console.log(event.projectId)  
            return false
             }
             
                
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
                    
                            
          return false


          
    })

  });





  /*              // function getDate(date){
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
    $('#submit').click(function(){
        window.location.reload(true);
    })

   */
                   
                // if (projectId.length > 0){
                //     var queryurl2 = cors + "http://test.hellotoby.com:8889/api/admin/schedule?projectId=" + projectId }
                //     else if(supplierId.length > 0){
                //     var queryurl2 = cors + "http://test.hellotoby.com:8889/api/admin/schedule?projectId=" + projectId + "scSupplierId }
                //     }
                    // +currentDate + "&end=" + finishDate + "&projectId=" + projectId
           
//                        $('#calendar').fullCalendar('destroy')
//                        $('#calendar').fullCalendar({
//                            navLinks:true,
//                               eventRender: function(event, element) {
//                                 var itemtitle = event.startDate + event.consumerName 
//                                 var itemcontent = 'End time:' + event.endDate + 'Address:' + event.address  + 'Status:' + event.status + 'Project ID:' + event.projectId + 'Supplier Name :' + event.supplierName + 'Supplier ID :' + event.supplierId + 'Rate :' + event.hourlyWage + 'Payload :' + event.totalPaidAmount 
//                                 //   let element = $(this)
//                                $(element).find('.fc-title').text(function(i, t) {
//                                 return t.replace(event.title,itemtitle)
//                                  }); 


//                                 $(element).popover({
//                                     title: itemtitle,
//                                     content: itemcontent,
//                                     trigger:'hover',
//                                     container:'body',
//                                     placement:'top'
//          })
//   },
//                            eventSources:[{
//                                url:queryurl2,
//                                title:'hi mother',
//                                type:"GET",
//                                 data:{},
                                
//                                  error: function() {
//                                      $('#script-warning').show();
//                                          },
//                            }],
                           
//                        })
                    
//                        $('#en_form')[0].reset()
//                 }
   
  