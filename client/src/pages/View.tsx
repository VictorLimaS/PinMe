import { Typography, Card, Button, Space, Tag, Divider } from "antd"
import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { api } from "../services/api"
import jsPDF from "jspdf"

const { Title, Text } = Typography

export function View() {
  const { id } = useParams()
  const [location, setLocation] = useState<any>(null)

  useEffect(() => {
    const interval = setInterval(async () => {
      const res = await api.get(`/location/${id}`)
      setLocation(res.data)
    }, 2000)

    return () => clearInterval(interval)
  }, [id])

  function generatePDF() {
    const doc = new jsPDF()

    doc.setFontSize(18)
    doc.text("Comprovante", 20, 20)

    doc.setFontSize(12)
    doc.text(`Valor: R$ ${location?.amount}`, 20, 40)
    doc.text(`Latitude: ${location?.lat}`, 20, 55)
    doc.text(`Longitude: ${location?.lng}`, 20, 70)
    doc.text(`Data: ${new Date().toLocaleString()}`, 20, 85)

    doc.save("comprovante.pdf")
  }

  const mapLink = location
    ? `https://www.google.com/maps?q=${location.lat},${location.lng}`
    : ""

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: 16,
        background: "#f5f5f5"
      }}
    >
      <Card
        style={{
          width: "100%",
          maxWidth: 420,
          borderRadius: 20,
          boxShadow: "0 10px 30px rgba(0,0,0,0.08)"
        }}
      >
       <Space style={{ width: "100%", display: "flex", flexDirection: "column" }} size="large">

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <Title level={3} style={{ margin: 0 }}>
                Localização 📍
              </Title>
              <Text type="secondary">
                Atualização em tempo real
              </Text>
            </div>

            {location ? (
              <Tag color="green">Online</Tag>
            ) : (
              <Tag color="orange">Aguardando</Tag>
            )}
          </div>

          <Divider style={{ margin: "8px 0" }} />

          {location ? (
            <Space style={{ width: "100%", display: "flex", flexDirection: "column" }} size="large">

              <div>
                <Text type="secondary">Valor</Text>
                <div style={{ fontSize: 22, fontWeight: 600 }}>
                  R$ {location.amount}
                </div>
              </div>

              <div>
                <Text type="secondary">Latitude</Text>
                <div>{location.lat}</div>
              </div>

              <div>
                <Text type="secondary">Longitude</Text>
                <div>{location.lng}</div>
              </div>

              <Divider style={{ margin: "8px 0" }} />

              <Space style={{ width: "100%", display: "flex", flexDirection: "column" }} size="large">

                <Button
                  type="primary"
                  size="large"
                  block
                  href={mapLink}
                  target="_blank"
                >
                  Ver no mapa
                </Button>

                <Button
                  size="large"
                  block
                  onClick={generatePDF}
                >
                  Baixar comprovante
                </Button>

              </Space>
            </Space>
          ) : (
            <Text>Aguardando localização...</Text>
          )}
        </Space>
      </Card>
    </div>
  )
}