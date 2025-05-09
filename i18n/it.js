const I18N_IT = {
    name: "Italiano",
    dictionary: {
        // Common Vocabulary / Words
        zome: "Zome",
        shape: "Forma",
        faces: "Facce",
        timbers: "Travetti",
        framework: "Carpenteria",
        origami: "Origami",
        view_3D: "Vista 3D",
        vanishing_lines: "Linee di fuga",
        axes: "Assi",
        spin: "Rotazione",
        vertices: "Vertici",
        fullscreen: "Schermo intero",
        keyboard_shortcuts: "Tasti rapidi",
        skeleton: "Scheletro 3D",
        outer: "Esterno",
        inner: "Interno",
        outer_faces: "Facce esterne",
        inner_faces: "Facce interne",
        outer_faces_on_the_ground: "Facce esterne a terra",
        inner_faces_on_the_ground: "Facce interne a terra",
        timber_profiles: "Profili dei travetti",
        timbers_of_each_face: "Travetti di ogni faccia",
        timber_is_not_machinable: "Questo profilo non è lavorabile. Prova a cambiare alcune impostazioni come 'Spessore' o 'Punto di fuga'!",
        framework_is_not_machinable: "Questa carpenteria non è lavorabile. Prova a cambiare alcune impostazioni come 'Spessore' o 'Punto di fuga'!",
        profile: "Profilo",
        face: "Faccia",
        spirals: "Spirali",
        flattened_zome: "Zome appiattito",
        flattened_faces: "Mandala",
        zome_made_with: "Questo zome è stato realizzato con",
        framework_customizer: "Personalizzatore di carpenteria",
        dihedral_angle: "Angolo diedro",
        wedge_angle: "Angolo cuneo",
        face_angles: "Angoli delle facce",
        roof: "Tetto",
        left: "Sinistra",
        right: "Destra",
        top: "Alto",
        bottom: "Basso",
        front: "Fronte",
        back: "Retro",
        not_allowed: "Non consentito",
        valid: "Valido",
        print: "Stampa",
        bevel: "Smusso",
        no_bevel: "Nessuno smusso",

        // Tooltips
        tooltip_display_help: "Mostra aiuto",
        tooltip_close: "Chiudere",
        tooltip_randomize_shape: "Genera una forma casuale",
        tooltip_reset_settings: "Ripristina le impostazioni",
        tooltip_save_settings: "Salva le impostazioni",
        tooltip_copy_link: "Copiare il link",
        tooltip_link_buymeacoffee: "Comprami un caffè ☕ se ami Z5omes 🙏",
        tooltip_link_facebook: "Vieni a chattare 📢 con la community 'Zome Building Network'",
        tooltip_link_youtube: "Visita il canale YouTube 🎥 per saperne di più su Z5omes",
        tooltip_link_github: "Vai su Github 🐈 se hai domande",
        tooltip_link_linkedin: "Visita il mio profilo Linkedin",
        tooltip_export_2_format: "Esportare nel formato $1",
        tooltip_parts_are_stored_in_separate_files: "Le parti vengono memorizzate in file separati quando vengono esportate",
        tooltip_draw_face_colors: "Disegnare i colori delle facce",
        tooltip_draw_face_centroids: "Disegnare i centri delle facce",
        tooltip_split_drawing: "Dividi il disegno in più fogli A4 per esportarlo in formato PDF",
        tooltip_customize_framework: "Personalizza la carpenteria",
        tooltip_show_keyboard_shortcuts: "Mostra i tasti rapidi",
        tooltip_download_3D_view_in_png_format: "Cattura la vista 3D ed esporta in formato PNG",
        tooltip_inversion_Y_Z_axes: "Inversione degli assi Y e Z",
        tooltip_bindu_ratio: "Rapporto 'Bindu' per la corona selezionata (Disponibile solo se il rombo è diviso orizzontalmente o verticalmente)",
        tooltip_illuminate_object: "Illumina l'oggetto 3D",
        tooltip_decrease_spiral_rotations: "Diminuisci le rotazioni della spirale",
        tooltip_increase_spiral_rotations: "Aumenta le rotazioni della spirale",
        tooltip_add_floor: "Aggiungi il pavimento",
        tooltip_draw_vanishing_lines: "Disegna le linee di fuga",
        tooltip_add_zome_reflection: "Aggiungi il riflesso dello zome",
        tooltip_draw_axes: "Disegna gli assi 3D",
        tooltip_draw_labels: "Disegna le etichette",
        tooltip_spin: "Rotazione on/off",
        tooltip_selected_crown: "Corona selezionata",

        // Keyboard shortcuts
        key_H_3D_view: "Ripristinare la vista camera",
        key_left_3D_view: "Vista da sinistra",
        key_up_3D_view: "Vista da sopra",
        key_right_3D_view: "Vista da destra",
        key_down_3D_view: "Vista da sotto",
        key_space_3D_view: "Rotazione on/off",
        key_mul_3D_view: "Aumentare la velocità di rotazione",
        key_div_3D_view: "Ridurre la velocità di rotazione",

        // Options
        opt_none: "Nessuno",
        opt_horizontal: "Orizzontale",
        opt_vertical: "Verticale",
        opt_footing: "Basamento",

        // Help
        help_shape: "La forma di un zome è determinata da:",
        help_n_param: "Numero di rombi che ruotano attorno all'asse verticale, chiamato anche 'frequenza del zome'",
        help_m_param: "Numero di corone di rombi dall'alto verso il basso",
        help_f_param: "Angolo di forma(Θ) | Numero(F) che permette di calcolare la pendenza del zome. F = tan(Θ)",
        help_hr_param: "Rapporto tra l'altezza visibile del zome e la sua altezza totale (Imposta HR a 1 per un zome intero)",
        help_magnetize_param: "Magnetizzare la punta del rombo troncato al suolo",
        help_kr_param: "Rapporto tra la lunghezza dei bordi inferiori e quella dei bordi superiori di un rombo",
        help_set_rhombus_param: "Imposta su rombo (equilatero)",
        help_painting_param: "Colorare le facce con le stesse etichette o dipingere spirali di colori diversi",
        help_zh_param: "Altezza della parte visibile del zome prima di generare le travi",
        help_tw_param: "Larghezza delle travi",
        help_tt_param: "Spessore delle travi",
        help_am_param: "Da sinistra a destra :",
        help_am_param_1: "Direzione di espansione della struttura : ↑ verso l'esterno o ↓ verso l'interno",
        help_am_param_2: "Metodo di assemblaggio",
        help_am_param_3: "Direzione di assemblaggio : In senso orario, Antiorario o nessuna direzione (SemiCone)",
        help_vp_param: "Altezza del punto di scomparsa (utilizzato per costruire i metodi 'GoodKarma' e 'Beveled')",
        help_zc_param: "Posiziona il punto di scomparsa al centro di gravità (basato sull'intero zome)",
        help_ft_param: "Aggiungi una fondazione basata sullo spessore delle travi",
        help_ro_param: "Sovraccarico del tetto",

        // Measurements table
        measurements: "Misure",
        id: "Id",
        quantity: "Quantità",
        width: "Larghezza",
        height: "Altezza",
        length: "Lunghezza",
        thickness: "Spessore",
        edges: "Bordi",
        angles: "Angoli",
        slope_angle: "Angolo di inclinazione",
        area: "Superficie",
        radius: "Raggio",
        actual_zome_height: "Altezza effettiva dello zome",
        num_of_different_faces: "Numero di facce di forme diverse",
        total_number_of_faces: "Numero totale di facce",
        widest_radius_of_faces: "Raggio massimo delle facce",
        total_area_of_faces: "Area totale delle facce",
        num_of_different_timbers: "Numero di travetti diversi",
        total_number_of_timbers: "Numero totale di travetti",
        timber_lengths: "Lunghezze dei travetti",
        total_length_of_timbers: "Lunghezza totale dei travetti",
        floor_perimeter: "Perimetro a terra",
        floor_radius: "Raggio a terra",
        floor_area: "Superficie a terra",

        // Toast message
        toast_settings_restored: "Le impostazioni sono state ripristinate!",
        toast_settings_save: "Le impostazioni sono state salvate!",
        toast_link_copied: "Il collegamento è stato copiato negli appunti!",
        toast_error: "Si è verificato un errore",
    },
};