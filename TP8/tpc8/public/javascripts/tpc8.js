$(()=>{
    $('#tabela').load('http://localhost:4008/ficheiros')

    $('#adicionar').click(e => {
        e.preventDefault()
        $('#tabela').append('<tr>' + 
                                '<th> Ficheiro </th>' +
                                '<td>' +
                                    '<a href=' + $('#fich').val()  + '>' + $('#fich').val() + '</a>' +
                                '</td>' + 
                            '</tr>' +
                            '<tr>' + 
                                '<th> Descricao </th>' +
                                '<td>' + $('#desc').val() + '</td>' + 
                            '</tr>') 
        ajaxPost()
    })

    function ajaxPost(){
        var form_data = new FormData($('#fileForm')[0])
        $.ajax({
            type: "POST",
            url: "http://localhost:4008/ficheiros/guardar",
            data: form_data,
            contentType: false,
            processData: false,
            success: file => alert('Ficheiro gravado com sucesso!'),
            error: e => {
                alert('Erro no post: ' + JSON.stringify(e))
                console.log('ERRO: ' + e)
            }
        })
        $('#fich').val('')
        $('#desc').val('')
    }
})