import { useEffect, useState } from "react";
import axios from "axios";
import { Card, Col, Modal, Progress, Row, Spin } from "antd";
import style from "./Container.module.css";

function SearchResults({ searchTerm }) {
  const [pokemon, setPokemon] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [loading, setLoading] = useState(false);

  const showModal = (pokemon) => {
    setSelectedPokemon(pokemon);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  useEffect(() => {
    if (searchTerm) {
      setLoading(true);
      axios
        .get(`https://pokeapi.co/api/v2/pokemon/${searchTerm}`)
        .then((res) => {
          let imageUrl = `https://unpkg.com/pokeapi-sprites@2.0.2/sprites/pokemon/other/dream-world/${res.data.id}.svg`;
          return fetch(imageUrl)
            .then((res) => {
              if (res.ok) {
                return imageUrl; // Image exists, use it
              } else {
                throw new Error("Image does not exist");
              }
            })
            .catch((error) => {
              console.log(`Using fallback image for Pokemon: ${res.data.name}`);
              return "https://i.pinimg.com/474x/a9/9c/70/a99c70aa145259ee5c2865cfdcbebb5c--sticker.jpg"; // Replace with your fallback image URL
            })
            .then((imageUrl) => {
              setPokemon({ ...res.data, image: imageUrl });
              setLoading(false);
            });
        })
        .catch((error) => {
          console.log(error);
          setPokemon(null);
          setLoading(false);
        });
    }
  }, [searchTerm]);

  console.log(selectedPokemon);

  return (
    <>
      {loading ? (
        <div
          style={{
            margin: "5rem",
            display: "flex",
            justifyContent: "center",
            alignContent: "center",
          }}
        >
          <Spin size='large' />
        </div>
      ) : (
        <div style={{ margin: "4rem" }}>
          <Row gutter={[16, 16]} justify='space-around'>
            {pokemon ? (
              <Col xs={24} sm={12} md={8} lg={6} xl={4}>
                <Card
                  hoverable
                  style={{ width: "100%", height: "auto", padding: "1rem" }}
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
                    title={`${pokemon.name.toUpperCase()} #${pokemon.id}`}
                    description={`Type: ${pokemon.types[0].type.name}`}
                  />
                </Card>
              </Col>
            ) : (
              <div style={{ margin: "3rem" }}>
                <p>No Pokemon found</p>
              </div>
            )}
          </Row>
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
                      <strong>{stat.stat.name.toUpperCase()}</strong>
                      <Progress percent={stat.base_stat} />
                    </div>
                  ))}
                </Col>
              </Row>
            </Modal>
          )}
        </div>
      )}
    </>
  );
}

export default SearchResults;
