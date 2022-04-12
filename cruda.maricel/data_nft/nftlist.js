[
  '{{repeat(50)}}',
  {
    id: '{{index(1)}}',
    user_id: '{{integer(1,10)}}',
    name: '{{company()}}',
    category: '{{random("Bored_Ape_Yacht_Club", "Cryptopunks", "Doodles", "Cool_Cats", "CyberKongz")}}',
    type: function(tags) {
      var types = {
        Bored_Ape_Yacht_Club:["BoredApe_4","BoredApe_8", "BoredApe_27", "BoredApe_9949", "BoredApe_9992"],
        Cryptopunks: ["Cryptopunk_2306","Cryptopunk_2824", "Cryptopunk_4012", "Cryptopunk_5577", "Cryptopunk_9998"],
        Doodles: ["Doodle_2912","Doodle_3037", "Doodle_3688", "Doodle_7568", "Doodle_9659"],
        Cool_Cats: ["CoolCats_3419", "CoolCats_4695", "CoolCats_5635", "CoolCats_7270", "CoolCats_7807"],
        CyberKongz: ["CyberKong_1249", "CyberKong_2932", "CyberKong_3173", "CyberKong_6885", "CyberKong_4156"]

    };
   var chosen_category = types[this.category];
      var chosen_index = tags.integer(0,chosen_category.length-1);
      return chosen_category[chosen_index];
    },
    description: '{{lorem(3, "sentences")}}',
      img: function(tags) {
    return 'https://via.placeholder.com/400/' +
      tags.integer(585,658) + '/fff/?text=' + this.name;
      },
      date_create: '{{date(new Date(2022, 0, 1), new Date(), "YYYY-MM-dd hh:mm:ss")}}'
  }
]