import { Link } from "expo-router";
import { Text, View } from "react-native";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "green",
      }}
    >
      <Text style={{color: "yellow"}}>Mera naam hai nischay yaad rakhna</Text>
      <Link style={{color: "yellow"}} href={"/about"}>About</Link>
    </View>
  );
}
