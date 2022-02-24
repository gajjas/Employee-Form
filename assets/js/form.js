function formatPhone(number) {
    var newVal = ''
    for (let i = 0; i < number.length; i++) {
        if (i == 0) newVal = '(' + number[i]
        else if (i == 3) newVal += ') ' + number[i]
        else if (i == 6) newVal += '-' + number[i]
        else newVal += number[i]
    }
    return newVal
};

employeeNumberInput = $('#Number')
phoneInput = $('#Phone')
zipInput = $('#Zip')

employeeNumberInput.keypress(function(e) {
    if (e.which != 8 && isNaN(String.fromCharCode(e.which))) {
        e.preventDefault();
    }
});

phoneInput.keypress(function(e) {
    var number = $(this).val().replace(/\D/g, '')
    if (e.which != 8 && isNaN(String.fromCharCode(e.which)) || number.length >= 10) {
        e.preventDefault();
    }
});

phoneInput.keyup(function(e) {
    var number = $(this).val().replace(/\D/g, '')
    $(this).val(formatPhone(number));
});

zipInput.keypress(function(e) {
    if (e.which != 8 && isNaN(String.fromCharCode(e.which)) || $(this).val().length >= 5) {
        e.preventDefault();
    }
});

// Form Submission
$('#formId').submit(function(e) {
    e.preventDefault();
    var values = $(this).serializeArray();

    var form = {}
    values.forEach((input, i) => {
        if (input.name == 'CurrentEmployee') {
            if (input.value == 'on') form[input.name] = true
            else form[input.name] = false
        } else form[input.name] = input.value
    });

    $.post("/employee form", form, function(data, textStatus, jqXHR) {
            console.log('Sent data successfully')
        }).done(function() {
            alert("success");
        })
        .fail(function() {
            alert("Form Submitted in Theory\n" + JSON.stringify(form));
        });
});