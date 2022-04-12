[
  '{{repeat(250)}}',
  {
    id: '{{index(1)}}',
    nft_id: '{{integer(1,50)}}',


    lat: '{{floating(37.429674, 37.444531)}}',
    lng: '{{floating(-122.045048, -122.149418)}}',

    description: '{{lorem(3, "sentences")}}',
    img: 'https://via.placeholder.com/400/',
    icon: 'https://via.placeholder.com/400/?text=ICON',
    date_create: '{{date(new Date(2022, 0, 1), new Date(), "YYYY-MM-dd-hh:mm:ss")}}'
  }
]
