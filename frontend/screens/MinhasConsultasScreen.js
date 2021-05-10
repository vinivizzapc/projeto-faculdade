import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, View, StatusBar, FlatList, ScrollView, TouchableOpacity, SafeAreaView, Image } from 'react-native';
import { Icon, Footer, Separator } from 'native-base';
import css from '../style/css';
import api from '../services/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FontAwesome5 } from '@expo/vector-icons';

function MinhasConsultasScreen ({ navigation }){
  const [consultas, setConsultas] = useState([]);
  const [usuario, setUsuario] = useState({});

  useEffect(() => {
    async function getUser(){
      const user = await AsyncStorage.getItem('user');
      const jsonValue = JSON.parse(user);
      setUsuario(jsonValue);
    }
    getUser();
  }, [usuario]);

  useEffect(() => {
    async function listagem(){
      const response = await api.get(`/usu/consultas/${usuario.idusuario}`)
      setConsultas(response.data)
    }
    listagem()
  }, [consultas]);

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#008B8B"/>
        <View style={css.containerHeader}>
        <View style={css.IconPosicao}>
          <Icon name="menu" onPress={() => navigation.openDrawer()}/>
        </View>
        </View> 
        <View style={{flex:1}}>
          <SafeAreaView>
              <View>
                <FlatList 
                  nEndReachedThreshold={0.1}
                  data={consultas}
                  keyExtractor={item => item.idconsultas.toString()}
                  renderItem={({ item }) => (

                    
                    <View style={{padding:5}}>

                        <Separator style={styles.itemDivisao}>
                          <View style={styles.divisaoItem}>
                                <Text style={styles.divisao}>{item.status}</Text>
                          </View>
                        </Separator>

                      <View style={{ flex: 1,flexDirection: 'row',backgroundColor:'#80cbc4',margin:10, borderRadius: 10,  borderBottomColor:'#e0e0e0',borderRightColor:'#e0e0e0',borderRightWidth:3,borderBottomWidth:3,}}>
                        

                        <View style={{margin:11}}>
                          <Image style={{width:50,height:50, borderWidth:1, borderRadius:3}} source={require('../assets/img/logo.png')}/>
                        </View>

                        <View style={{flex:1,justifyContent:'center'}}>
                          <Text style={{color: 'black', fontSize:18}}>
                          {item.idconsultas}
                          </Text>
                          <Text style={{color: 'grey', fontSize:14}}>
                            {item.data}
                          </Text>
                        </View>


                        <View style={{paddingLeft:10, justifyContent:'center', alignItems:'center'}}>
                          <TouchableOpacity  onPress={() => excluirPrevencao(item.idconsultas)}>
                            <FontAwesome5 name="edit" size={24} style={{color: 'orange'}} />
                          </TouchableOpacity>
                        </View>
                        <View style={{paddingLeft:15, justifyContent:'center', alignItems:'center',marginRight:13}}>
                          <TouchableOpacity  onPress={() => excluirPrevencao(item.idconsultas)}>
                            <FontAwesome5 name="trash" size={24} style={{color: 'red'}} />
                          </TouchableOpacity>
                        </View>
                      </View>
                    </View>
                    
                  )}
                /> 
              </View>      
          </SafeAreaView>
        </View>
      <Footer style={{backgroundColor:"#008B8B"}}/>
    </View>
    
  );
}

export default MinhasConsultasScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
});
