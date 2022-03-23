import React, {useState} from 'react'
import { Text, View, TextInput, TouchableOpacity, Alert } from 'react-native'
import alunoTabela from '../controller/controller'
import { Aluno } from '../model/model'
import  meuEstilo  from '../estilo/meuEstilo'
import Icon from 'react-native-vector-icons/Ionicons'

// métodos da home

export default class App extends React.Component {
  
constructor(props) {
    super(props);
    this.findAllalunoTabela() 
    }
    
    state = {
    contato:alunoTabela,
    lista_array_dados_aluno: [],
    value: null, 
    onChangeText: null,
    id: 1, 
    id_aluno: "",
    matricula: "",
    semestre: "",
    estilo: "",
    nota: ""
    }
    
    //acionado quando o componente e montado
    componentDidMount () {
    this.instanciaralunoTabela();
    this.findAllalunoTabela ();
    }
    
    //escuta atualizações na lista
    componentDidUpdate (prevProps: any, prevState: { lista_array_dados_aluno:never[]; }) {
    if (prevState.lista_array_dados_aluno !== this.state.lista_array_dados_aluno) {
    this.findAllalunoTabela ();
    }
    }

    findAllalunoTabela=()=> {
        alunoTabela.findAll()
        .then((response: any) => {
        this.setState({
        lista_array_dados_aluno: response._array,
        isLoading: false,
        })
        }), (error: any) => {
        console.log(error);
        }
        }


    deleteContato=(id: number)=> {
    this.findContatoById(id)
    if (this.state.id != null || this.state.id != undefined) {
        alunoTabela.deleteById(id)
    Alert.alert("contato excluido com sucesso: ")
    }
    }
    
    atualizaContato=(item0: number, item1: string, item2: string,item3: string, item4: string, item5: string)=> {
    let contato=new Aluno()// cria objeto memória
    contato.id=item0 // seta o atributo matricula do objeto 
    contato.id_aluno=item1 // seta o atributo matricula do objeto 
    contato.matricula=item2 // seta o atributo matricula do objeto 
    contato.semestre=item3 // seta o atributo matricula do objeto 
    contato.estilo=item4
    contato.nota=item5 // seta o atributo matricula do objeto 
    // com o valor(state) do item
    
    alunoTabela.updateByObjeto(contato).then((response: any) => {
    if (response._array.length >0 && response!= null && response!= undefined) {
    // popular o objeto da memória
    Alert.alert("Atualizado"); 
    
    } else {
    Alert.alert("matricula não encontrado")
    }
    }), (error: any) => {
    console.log(error);
    }
    }
    
    
    insertContato=(item1: string, item2: string,item3: string,item4: string, item5: string)=> {
    let contato=new Aluno()// cria objeto memória
    contato.id_aluno=item1 // seta o atributo matricula do objeto 
    contato.matricula=item2 // seta o atributo matricula do objeto 
    contato.semestre=item3 // seta o atributo matricula do objeto 
    contato.estilo=item4 // seta o atributo matricula do objeto 
    contato.nota=item5 // seta o atributo matricula do objeto 
    // com o valor(state) do item
    
    // cria um id_aluno no banco para persistir o objeto
    const insertId=alunoTabela.addData(contato);
    // testa pra ver se deu certo a criação do id_aluno
    if(insertId==null || insertId==undefined){
    Alert.alert("Não foi possivel inserir o novo contato")
    }
    return contato
    }
    
    instanciaralunoTabela=()=>{
    let contato:alunoTabela=new alunoTabela()// cria objeto memória
    return contato
    }
    
    
    
    findContatoById=(id: number)=> {
    alunoTabela.findById(id)
    .then((response: any) => {
    if (response._array.length >0 && response!= null && response!= undefined) {
    } else {
    Alert.alert("id_aluno não encontrado")
    }
    }), (error: any) => {
    console.log(error);
    }
    }
    
    localizaContato=(id: number)=> { 
    alunoTabela.findById(id)
    .then((response: any) => {
    if (response._array.length >0 && response!= null && response!= undefined) {
    let contatopesquisa:Aluno=new Aluno()// cria objeto memória
    const contatoretorno=response._array.map((item: { id: number; id_aluno: string; matricula: string; semestre: string; estilo: string; nota: string; },key: any)=>{
    contatopesquisa.id=item.id;
    contatopesquisa.id_aluno=item.id_aluno;
    contatopesquisa.matricula=item.matricula;
    contatopesquisa.semestre=item.semestre;
    contatopesquisa.estilo=item.estilo;
    contatopesquisa.nota=item.nota;
    })
    // o SetState abaixo mostra para o usuário o objeto recuperado do banco
    // e atualmente somente em memória 

    this.setState({
    contato:contatopesquisa,
    id: contatopesquisa.id,
    id_aluno: contatopesquisa.id_aluno,
    matricula:contatopesquisa.matricula,
    semestre:contatopesquisa.semestre,
    estilo:contatopesquisa.estilo,
    nota: contatopesquisa.nota
    })
    // popular o objeto da memória
    //Alert.alert("Atualizado"); 
        } else {
    Alert.alert("matricula Não foi possível atualizar")
    }
    }), (error: any) => {
    console.log(error);
    }
    }


    // fim da parte de funções
    // agora é necessário passar os parametros para a visão através de renderização
    


    // aqui temos a renderização da tela (visão)
    render() {

        //extrai as propriedades entre chaves
        const {contato, lista_array_dados_aluno, value, id, id_aluno, matricula, semestre, estilo, nota} = this.state;
        // se tivermos animais listados oriundos do banco
        // a lista é mostrada na visão
        //const {animal}=animal;
        
        const alunoList = lista_array_dados_aluno.map((item, key) => {
            return (
                <>
                    <Text >  id:{item.id} id_aluno:{item.id_aluno} matricula:{item.matricula} semestre:{item.semestre} estilo:{item.estilo} nota:{item.nota}</Text>
                </>
            )
        })

        return (

            <View style={meuEstilo.container}>

                <Text style={meuEstilo.titulo}>Crud de Alunos</Text>
            
                <TextInput
                    placeholder="digite o id do aluno Pesquisar"
                    style={meuEstilo.pesquisa}
                    onChangeText={id  => { this.setState({ id : id }) }}
                    value={id}
                />
                <View style={meuEstilo.pesquisatxt}>
                <TouchableOpacity onPress={() => { id  == 0 ? Alert.alert("O campo de ID não pode ser vazio") : this.localizaContato(id)  }}>
                <Icon name="md-search" size={30} color="white" />
                    </TouchableOpacity>
                </View>

                <Text>{id_aluno}</Text>
                    
                <TextInput
                    placeholder="digite o nome do novo aluno"
                    style={meuEstilo.textInput}
                    // a cada letra digitada (change) ajusta o state
                    onChangeText={id_aluno => { this.setState({id_aluno: id_aluno }) }}
                    value={id_aluno}
                />

                <TextInput
                    placeholder="digite a matricula do novo aluno"
                    style={meuEstilo.textInput}
                    // a cada letra digitada (change) ajusta o state
                    onChangeText={matricula => { this.setState({ matricula: matricula }) }}
                    value={matricula}
                />

                    <TextInput
                    placeholder="digite o semestre "
                    style={meuEstilo.textInput}
                    // a cada letra digitada (change) ajusta o state
                    onChangeText={semestre => { this.setState({ semestre: semestre }) }}
                    value={semestre}
                    
                />

                <TextInput
                    placeholder="digite o estilo de desenho "
                    style={meuEstilo.textInput}
                    // a cada letra digitada (change) ajusta o state
                    onChangeText={estilo => { this.setState({ estilo: estilo }) }}
                    value={estilo}
                    
                />
                <TextInput
                    placeholder="digite a nota "
                    style={meuEstilo.textInput}
                    // a cada letra digitada (change) ajusta o state
                    onChangeText={nota => { this.setState({ nota: nota }) }}
                    value={nota}
                    
                />
                
                <View style={meuEstilo.containerTouch}>
                    <TouchableOpacity onPress={() =>  {matricula == ""  ? Alert.alert("O campo de matricula não pode ser vazio") :this.insertContato(id_aluno, matricula, semestre, estilo, nota)}} style={{ alignItems: "center", backgroundColor: 'green' }}>
                    <Text style={meuEstilo.textInput}>Matricular aluno</Text>
                    </TouchableOpacity>
                </View>

                <View style={meuEstilo.containerTxt}>
                    <TouchableOpacity onPress={() =>  {id_aluno == ""  ? Alert.alert("Não tem Objeto para atualizar faça uma pesquisa") :this.atualizaContato(id, id_aluno, matricula, semestre, estilo, nota)}} >
                    <Icon name="md-refresh" size={30} color="white" />
                    </TouchableOpacity>
                </View>

                <View style={meuEstilo.containerTxt}>
                    <TouchableOpacity onPress={() => { id != null? Alert.alert("O campo de ID não pode ser vazio") : this.deleteContato(id) }} >
                    <Icon text="apagar" name="md-remove" size={30} color="white" />
                    </TouchableOpacity>
                </View>
                {alunoList}
            </View>
        );
    }
}