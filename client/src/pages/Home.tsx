import { Button, Card, Typography, Input, Space, message } from "antd"
import { useState } from "react"
import { api } from "../services/api"
import { useNavigate } from "react-router-dom"

const { Title, Text } = Typography

export function Home() {
  const [id, setId] = useState("")
  const [amount, setAmount] = useState("")
  const [links, setLinks] = useState<any>(null)
  const navigate = useNavigate()

  async function handleCreate() {
    try {
      const res = await api.post("/create", {
        amount
      })
      setLinks(res.data)
    } catch {
      message.error("Erro ao gerar link")
    }
  }

  function handleView() {
    if (!id) return message.warning("Informe um ID ou link")

    const extractedId = id.split("/").pop()
    navigate(`/view/${extractedId}`)
  }

  function copy(text: string) {
    navigator.clipboard.writeText(text)
    message.success("Link copiado!")
  }

  function share(text: string) {
    if (navigator.share) {
      navigator.share({
        title: "PINME 📍",
        text: "Visualizar comprovante",
        url: text
      })
    } else {
      copy(text)
    }
  }

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
          <div>
            <Title level={2} style={{ margin: 0 }}>
              PINME 📍
            </Title>
            <Text type="secondary">
              Compartilhe localização
            </Text>
          </div>

          <Input
            placeholder="Valor (ex: 1200)"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />

          <Button type="primary" block size="large" onClick={handleCreate}>
            Gerar link
          </Button>

          {links && (
            <div>
              <Text strong>Compartilhar link</Text>

              <div
                style={{
                  marginTop: 8,
                  padding: 10,
                  background: "#fafafa",
                  borderRadius: 8,
                  wordBreak: "break-all"
                }}
              >
                {links.trackLink}
              </div>

              <Space style={{ marginTop: 10 }}>
                <Button onClick={() => copy(links.trackLink)}>
                  Copiar
                </Button>

                <Button
                  type="primary"
                  onClick={() => share(links.trackLink)}
                >
                  Compartilhar
                </Button>
              </Space>
            </div>
          )}

          <div>
            <Input
              placeholder="Cole link ou ID"
              value={id}
              onChange={(e) => setId(e.target.value)}
            />

            <Button
              block
              size="large"
              onClick={handleView}
              style={{ marginTop: 10 }}
            >
              Ver localização
            </Button>
          </div>

        </Space>
      </Card>
    </div>
  )
}