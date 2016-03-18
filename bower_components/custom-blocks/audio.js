SirTrevor.Blocks.Audio = SirTrevor.Block.extend({

    type: "audio",
    title: function() { return 'Аудиофайл'; },

    droppable: true,
    uploadable: true,

    icon_name: '<i class="fa fa-pencil-square-o"></i>',

    loadData: function(data){
        // Create our image tag
        this.$editor.html($('<source>', { src: data.file.url, type: data.file.type }).appendTo('<audio controls></audio>'));
    },

    onBlockRender: function(){
        /* Setup the upload button */
        this.$inputs.find('button').bind('click', function(ev){ ev.preventDefault(); });
        this.$inputs.find('input').on('change', (function(ev) {
            this.onDrop(ev.currentTarget);
        }).bind(this));
    },

    onDrop: function(transferData){
        var file = transferData.files[0],
            urlAPI = (typeof URL !== "undefined") ? URL : (typeof webkitURL !== "undefined") ? webkitURL : null;

        // Handle one upload at a time
        if (/audio/.test(file.type)) {
            this.loading();
            // Show this image on here
            this.$inputs.hide();
            this.$editor.html($('<audio>', { src: urlAPI.createObjectURL(file) })).show();

            this.uploader(
                file,
                function(data) {
                    this.setData(data);
                    this.ready();
                },
                function(error) {
                    this.addMessage(i18n.t('blocks:image:upload_error'));
                    this.ready();
                }
            );
        }
    }
});