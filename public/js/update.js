//JQuery ajax call to the REST API - executed on client side
var name;                                                  
var to_be_updated;
$(document).ready(function() {                    
    $('#myTable').DataTable();                
});

// edit data
$('.update').click(function() {                
    id= this.id;                                   //trap the user record to be updated
        $.ajax({                                   //construct the ajax call to the server REST API
            type: 'POST',                          //HTTP Operation  
            url: '/find_by_name',                  //Server Side REST API Endpoint
            data: {"name":id},                     //pass the user id to be updated  
            success: function(data){               //callback on success
                    to_be_updated = data[0].name;  //populate  record values into the JQuery Modal Dialog
                    $("#update_name").attr("value", data[0].name);       //databind the text boxes
                    $("#update_email").attr("value", data[0].email);
                    $("#update_phone").attr("value", data[0].phone);
                    console.log('modal ' + data);
                    $('#Modal').modal({show: true}); //Display the JQuery Modal Dialog with the record data 
                },
                error: function(){                     //callback on error
                    alert('No data');
                }
            });
});

// update data - Click event handler for the JQuery Modal Dialog 
$(function(){
    $('#update_table').on('click', function(e){   
           var data = $('#update_user').serialize(); //Modal Form obj mapping due to databinding
           e.preventDefault();                       //supress default form submit behavior
           $.ajax({                                  //construct the ajax message 
                url: '/update_user',                    //REST API on server side
                type:'PUT',                             //HTTP method to update record
                data : data,                            //data as obj mapped from Modal Form
                success: function(data){                //success callback
                  window.location.reload();             //refresh the html page             
            },
            error: function(){                        //error callback
                console.log('Error');
            }
        });
    });
});