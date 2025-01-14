
/**
 * provide a structure for fields used in a form
 */
export default class {
    edit='true'
    name = ''
    label = ''
    type = 'text'
    voc='open'
    coords = null
    special=false
    collection=''
    column
    __initialValue = null // save initial value
    __value = null// value that can be updated
    __dirty = false // mark the field as dirty if modified
    column
    link=false

    __ready = false


    constructor(params) {
        if(params?.name) this.name = params.name
        if(params?.label) this.label = params.label
        if(params?.type) this.type = params.type
        if(params?.value) this.__initialValue = this.__value = params.__value
        if(params?.column)this.column = params?.column ?? '12'
        if(params?.voc) this.voc = params.voc
        if(params?.edit) this.edit = params.edit
        if(params?.collection) this.collection = params.collection
        if(params?.special) this.special = params.special
        if(params?.coords) this.coords = params.coords

        if(params?.link) this.link = params.link

    }
    
    async setInitialValue(value) { this.__initialValue = this.__value = value }
    get initialValue() { return this.__initialValue }

    get value() { return this.__value }
    set value(value) {
        value = this.beforeSetValue(value)
        this.__dirty = true
        this.__value = value
    }

    // visitor applied to the value is set
    beforeSetValue(value) { return value }

    get dirty() { return this.__dirty }

    /**
     * 
     * @returns the value as it is expected from the api
     */
    serialize() { return this.value }

    #getDefaultValueByType(type) {
        let value
        switch (type) {
            case 'text':
                value = ''
                break;
            case 'number':
                value = 0
                break;
            case 'boolean':
                value = false
                break;
            default:
                break;
        }
        return value
    }

}