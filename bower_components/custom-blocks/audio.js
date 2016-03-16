SirTrevor.Blocks.Audio = SirTrevor.Block.extend({

    type: "audio",
    title: function() { return 'Аудиофайл'; },

    droppable: true,
    uploadable: true,

    icon_name: 'file-music',

    loadData: function(data){
        // Create our image tag
        this.$editor.html($('<audio>', { src: data.file.url }));
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
        if (/image/.test(file.type)) {
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