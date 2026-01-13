$(function(){

    chrome.storage.sync.get('total', function(budget){
        $('#total').text(budget.total);

    
    });
    chrome.storage.sync.get('limit', function(budget){
        $("#limit").text(budget.limit);
    })
    $('#amountSpent').click(function(){
        chrome.storage.sync.get(['total','limit'], function(budget){
            var newTotal = 0;
            if(budget.total){
                newTotal += parseInt(budget.total);
            }

            let amount = $('#amount').val();

            if(amount){
                newTotal += parseInt(amount);
            }

            chrome.storage.sync.set({'total': newTotal}, function(){
                if(amount && newTotal >= budget.limit){
                    chrome.notifications.create({
                        type:'basic',
                        iconUrl:'images/icon-48.png',
                        title:'Limit Reached!',
                        message: "Looks like you've reached the limit"
                    })
                    
                }


            });

            $('#total').text(newTotal);
            $('#amount').val('');
        })
    })
})