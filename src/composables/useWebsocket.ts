import { onBeforeUnmount, ref } from "vue";
import { getToken } from "@/services/JwtService";

export const useConnectionWS = () => {
  const connection = ref<WebSocket>();

  try {
    connection.value = new WebSocket(
      `${
        import.meta.env.VITE_WEBSOCKET_BASE_URL
      }ws/user-connection-disconnection/?token=${getToken()}`
    );
    connection.value.onmessage = (event) => {
      console.log(event, "event in webSocket");
      const data = JSON.parse(event.data);
      console.log(data, "data in webSocket");
    };
  } catch (error: any) {
    console.log("wss", error);
  }

  onBeforeUnmount(() => {
    connection.value?.close();
  });

  return { connection };
};
