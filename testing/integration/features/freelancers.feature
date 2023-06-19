Feature: Freelancers Service
  In order to manage freelancers
  As a developer
  I want to make sure GET operations through REST API work fine

  Scenario Outline: get freelancers
    Given A freelancer email "<email>" exists
    When I send GET request to /search?search=
    Then I receive <response>

  Examples:
    | email                | response                                                                                                 |
    | ctaksrp@springer.com | [{"social_media_followers":"31515","last_name":"Taks","first_name":"Cozmo","skill":"Financial Analysis","id":16998,"email":"ctaksrp@springer.com","gender":"Polygender"}] |
    | awilles4v@i2i.jp     | [{"social_media_followers": "40579","last_name":"Willes","first_name":"Angelia","skill":"Sales","id":35176,"email":"awilles4v@i2i.jp","gender":"Female"}]       |
    | freelancerB@hotmail.com | []                                                                                                |
