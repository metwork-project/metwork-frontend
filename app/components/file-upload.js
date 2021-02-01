import Component from '@ember/component';
import $ from 'jquery';

export default Component.extend({

    editing: true,
    fileReady: false,
    uploading: false,
    modalDisplay: false,

    toggleModal: function (editing) {
        let attr = "disabled";
        this.set('editing', editing)
        this.set('uploading', !editing);
        let toggleField = function ($this) {
            if (editing) {
                if ($this.attr(attr)) { $this.removeAttr(attr); }
            } else {
                if (!$this.attr(attr)) { $this.attr(attr, attr); }
            }
        }
        $('.frag-upload-info').find('.form-control').each(function (index, field) {
            var $this = $(field);
            toggleField($this);
        });
        toggleField(this.getModal().find('.custom-file-input'))
    },

    getModal: function () {
        return $('.modal.' + this.modalId)
    },

    actions: {
        openUploadModal() {
            this.set("fileReady", false);
            this.toggleModal(true);
            this.set("modalDisplay", true);
            this.send('getFormat');
        },
        preloadFile() {
            this.set('self', this);
            let $this = this.getModal();
            let $input = $this.find('.file-input');
            let fileData = $('.file-input').children('input')[0].files[0]
            this.set('fileData', fileData);
            this.send('getFormat');
            let fileName = fileData.name;
            $input.children('label').text(fileName);
            let $bindName = $this.find('.meta-data').find('.bind-filename');
            if ($bindName.length > 0 && $bindName.val() === '') {
                $bindName.val(fileName.replace(/_/g, " ").substring(0, fileName.length - 4));
            }
            this.set("fileReady", true);
        },
        getFormat() {
            if (this.get('formatSelect')) {
                let target = $('.file-format').children('select')[0]
                if (target) {
                    this.set('fileFormat', target.value);
                } else {
                    this.set('fileFormat', this.get('formatSelect')[0].label);
                }
            }
        },

    },

});
