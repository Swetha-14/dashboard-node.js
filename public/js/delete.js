//JQuery ajax function call - executed on client side

$('.delete').click(function() {                               
    var response = confirm("do you want to delete");        
    name = this.id;                                            //trap the user  to be deleted
    console.log(response)
    if(response === true){                                     //if user confirms record deletion 
        $.ajax({                                               //construct ajax call to the RESP API
            type: 'DELETE',                                    //HTTP Operation
            url: '/delete_user',                               //Server side REST Endpoint
            method: 'delete',                                  //HTTP Method
            data: {"name":name},                               //user name to be deleted
            success: function(data){                           //callback if all is well
                window.location.reload()                       //refresh the html page on record deletion
            },
            error: function(){                                 //if error, callback
                alert('No data');
            }
        });
    }
    else{                                                     //if user cancels record deletion
        console.log("not deleted")
    }
});