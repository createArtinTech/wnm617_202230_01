[
  '{{repeat(10)}}',
  {
    id: '{{index(1)}}',
    name: '{{firstName()}} {{surname()}}',
    username: '{{company()}}',
    email: function() {
      return this.username + '@gmail.com';
    },
    address: '{{city()}}, {{state()}}',
    password: 'md5(pass)',
    one_liner: '{{lorem(1, "sentence")}}',
    member_since: '{{date(new Date(2022, 0, 1), new Date(), "YYYY-MM-dd")}}',
    img: function(tags) {
      return 'https://via.placeholder.com/400/' +
        tags.integer(700,999) + '/fff/?text=' + this.username;,
  }
]