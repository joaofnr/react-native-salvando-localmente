import { FlatList, SafeAreaView, StatusBar, StyleSheet, Text } from "react-native"
import NotaEditor from "./src/componentes/NotaEditor"
import { Nota } from "./src/componentes/Nota"
import { useEffect, useState } from "react"
import { buscaNotas, criaTabela, removeTabela, buscaNotasCategoria } from "./src/services/notas"
import { Picker } from "@react-native-picker/picker"

export default function App() {
  useEffect( () => {
    // removeTabela(),
    criaTabela()
    mostraNotas()
    setNotaSelecionada({})
    setCategoriaSelecionada('')
  },[])
  
  const [notaSelecionada, setNotaSelecionada] = useState({})
  const [notas, setNotas] = useState([])
  const [categoriaSelecionada, setCategoriaSelecionada] = useState('')

  async function mostraNotas() {
    const todasNotas = await buscaNotas()
    setNotas(todasNotas)
  }

  async function onPickerValueChange(categoria){
    setCategoriaSelecionada(categoria)
    if(categoria != '') {
      const notas = await buscaNotasCategoria(categoria)
      setNotas(notas)
    } else {
      mostraNotas()
    }
  }
  
  return (
    <SafeAreaView style={estilos.container}>
      <Text style={estilos.filterTitle}>Filtrar por categoria:</Text>
      <Picker 
        selectedValue={categoriaSelecionada}
        onValueChange={ novaCategoria =>onPickerValueChange(novaCategoria)}>
          <Picker.Item label="TODAS" value="" />
          <Picker.Item label="Pessoal" value="Pessoal" />
          <Picker.Item label="Trabalho" value="Trabalho" />
          <Picker.Item label="Outros" value="Outros" />
        </Picker>
      <FlatList
        data={notas}
        renderItem={(nota) => <Nota {...nota} setNotaSelecionada={setNotaSelecionada} />}
        keyExtractor={nota => nota.id}
      />
      <NotaEditor 
        mostraNotas={mostraNotas} 
        notaSelecionada={notaSelecionada}
        setNotaSelecionada={setNotaSelecionada} />
      <StatusBar/>
    </SafeAreaView>
  )
}

const estilos = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "stretch",
		justifyContent: "flex-start",
	},
  filterTitle: {
    fontSize: 24,
    textAlign: 'center'
  }
})

