import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Card, Col, Modal, Progress, Row, Spin } from "antd";
import style from "./Container.module.css";
function Container({ selectedType }) {
  console.log("selectContainer", selectedType);
  const [isLoading, setIsLoading] = useState(false);
  const [showMoreLoading, setShowMoreLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [pokemon, setPokemon] = useState([]);
  const [nextUrl, setNextUrl] = useState(
    `https://pokeapi.co/api/v2/pokemon?limit=40`
  );

  //for handling the show more button
  const clicking = {
    isShowMoreClicked: false,
  };

  const getData = (clicking) => {
    if (clicking.isShowMoreClicked) {
      setIsLoading(false);
      setShowMoreLoading(true);
    } else {
      setIsLoading(true);
    }
    axios.get(nextUrl).then((res) => {
      setNextUrl(res.data.next ? res.data.next : null); // Update the next URL
      const promises = res.data.results.map((pokemon) =>
        axios.get(pokemon.url).then((res) => {
          console.log(`Fetched details for Pokemon: ${res.data.name}`);
          return res.data;
        })
      );
      Promise.all(promises).then((results) => {
        const pokemonData = results.map((data) => {
          let imageUrl = `https://unpkg.com/pokeapi-sprites@2.0.2/sprites/pokemon/other/dream-world/${data.id}.svg`;
          return fetch(imageUrl)
            .then((res) => {
              if (res.ok) {
                return imageUrl; // Image exists, use it
              } else {
                throw new Error("Image does not exist");
              }
            })
            .catch((error) => {
              console.log(`Using fallback image for Pokemon: ${data.name}`);
              return "https://i.pinimg.com/474x/a9/9c/70/a99c70aa145259ee5c2865cfdcbebb5c--sticker.jpg"; // Replace with your fallback image URL
            })
            .then((imageUrl) => ({
              name: data.name,
              id: data.id,
              image: imageUrl,
              type: data.types.map((type) => type.type.name).join(", "),
              ability: data.abilities
                .map((ability) => ability.ability.name)
                .join(","),
              moves: data.moves
                .map((move) => move.move.name)
                .slice(0, 10)
                .join(", "),
              stats: data.stats.map((stat) => ({
                name: stat.stat.name,
                value: stat.base_stat,
              })),
            }));
        });
        Promise.all(pokemonData).then((pokemon) => {
          console.log("pokemon", pokemon);
          setPokemon((prevPokemon) => [...prevPokemon, ...pokemon]); // Merge with previous data
          setIsLoading(false);
          setShowMoreLoading(false);
        });
      });
    });
  };

  useEffect(() => {
    getData((clicking.isShowMoreClicked = false));
  }, []);

  const showModal = (pokemon) => {
    setSelectedPokemon(pokemon);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      <div className={style.site_card_wrapper}>
        {isLoading ? (
          <Spin size='large' />
        ) : (
          <>
            <Row gutter={[16, 16]} justify='space-around'>
              {pokemon
                .filter(
                  (poke) => !selectedType || poke.type.includes(selectedType)
                )
                .map((pokemon, index) => (
                  <Col xs={24} sm={12} md={8} lg={6} xl={4} key={index}>
                    <Card
                      hoverable
                      style={{
                        width: "100%",
                        minWidth: "12vw", // Set your desired minimum height
                        padding: "1rem",
                      }}
                      cover={
                        <img
                          alt={pokemon.name}
                          src={pokemon.image}
                          style={{ height: "240px", objectFit: "contain" }}
                          onClick={() => showModal(pokemon)}
                        />
                      }
                    >
                      <Card.Meta
                        title={`${pokemon.name.toUpperCase()}`}
                        description={`Type: ${pokemon.type}`}
                      />
                    </Card>
                  </Col>
                ))}
            </Row>

            {nextUrl && !selectedType && (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginTop: "1rem",
                }}
              >
                <Button
                  type='primary'
                  loading={showMoreLoading}
                  onClick={() => {
                    clicking.isShowMoreClicked = true;
                    getData(clicking);
                  }}
                >
                  Show More
                </Button>
              </div>
            )}
            {selectedPokemon && (
              <Modal
                title={selectedPokemon.name.toUpperCase()}
                visible={isModalVisible}
                onCancel={handleCancel}
                centered
                footer={null}
              >
                <Row align='middle'>
                  <Col
                    span={12}
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      padding: "0 10px",
                    }}
                  >
                    <img
                      alt={selectedPokemon.name}
                      src={selectedPokemon.image}
                      style={{ width: "100%", height: "auto" }}
                    />
                  </Col>
                  <Col span={12} style={{ padding: "0 0.5rem" }}>
                    {selectedPokemon.stats.map((stat, index) => (
                      <div key={index}>
                        <strong>{stat.name.toUpperCase}</strong>
                        <Progress percent={stat.value} />
                      </div>
                    ))}
                  </Col>
                </Row>
              </Modal>
            )}
          </>
        )}
      </div>
    </>
  );
}

export default Container;
