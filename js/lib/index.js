
 
 
  $(document).ready(function() {

    $('#calendar').fullCalendar({
      header: {
        left: 'prev,next today',
        center: 'title',
        right: 'month,agendaWeek,agendaDay,listWeek'
      },
      editable: true,
      navLinks: true, // can click day/week names to navigate views
      eventLimit: true, // allow "more" link when too many events
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
    ]
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
                });

                var projectId = data.requestidnum
                if (projectId.length > 0){
                    var queryurl = 'https://cors-anywhere.herokuapp.com/'+"http://test.hellotoby.com:8889/api/admin/schedule?projectId=" + projectId + "&supplierId="
                    
                   $.get(queryurl, function(response){
                       console.log(response)
                       $('#calendar').fullCalendar({
                           eventSources:{
                               url:queryurl,
                               type:"GET",
                                data:{},
                                 error: function() {
                                     $('#script-warning').show();
                                         },
                        color:'red'
                           }
                       })
                      
                   })
                }
          return false


          
    })

    $('#submit').click(function(){
        window.location.reload(true);
    })

   
  });
   
  