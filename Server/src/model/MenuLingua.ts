export class MenuLingua{
    readonly id_lingua: number;
    readonly id_menu: number;

    static readonly db_table_name = "menu_lingue";
    static readonly db_id_lingua = "IdLingua";
    static readonly db_id_menu = "IdMenu";

    constructor(id_lingua: number, id_menu: number){
        this.id_lingua = id_lingua;
        this.id_menu = id_menu;
    }
}