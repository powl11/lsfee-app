import React, { useState } from 'react';
import { 
  StyleSheet, Text, View, ScrollView, TouchableOpacity, Image, 
  StatusBar, SafeAreaView, Alert, Modal 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// ==================================================
// 🛠️ ZONA DE CONFIGURARE (Aici modifici datele)
// ==================================================

const CONFIG = {
  numeApp: "LSFEE Info",
  
  culori: {
    primar: '#00264d',       // Albastru inchis
    accent: '#00ccff',       // Cian
    fundal: '#f0f8ff',       // Fundal deschis
    textTitlu: '#00264d',
    textNormal: '#444444',
    cardFundal: '#ffffff',
  },

  imagini: {
    logo: '',
    // Imaginea de sus de la pagina Despre
    bannerDespre: 'https://i.postimg.cc/L6GRX1nV/Logo-Liga-02.png', 
  },

  texte: {
    acasa: {
      titlu: "Salutare, Voluntarule!",
      descriere: "Fii la curent cu toate activitățile noastre! Aici ai calendarul activităților LSFEE.",
      noutati: [
        { id: 1, titlu: "Cafeaua Electrizantă", data: "8-12 Dec, 10:00-18:00", loc: "Holul Electro", info: "Completarea Chestionarului Codul Drepturilor și Obligațiilor Studentului." },
        { id: 2, titlu: "Colinde", data: "Marți", loc: " 16 Dec", info: "Ne colindăm profesorii în spirit de sărbători." },
       // { id: 3, titlu: "Training Fundraising", data: "Sâmbătă, 10:00", loc: "Online", info: "Învață cum să atragi sponsori." },
      ]
    },
    despre: {
      titlu: "Despre LSFEE",
      descriere: "Liga Studenților din Facultatea de Inginerie Electrică și Energetică este vocea ta în facultate. Ne luptăm pentru drepturi și realizăm proiecte pentru tineri.",
    },
    // AICI ESTE SECTIUNEA NOUA DE ECHIPA
    echipa: [
      {
        id: 'birou',
        numeDepartament: "Biroul de Conducere",
        descriere: "Cei care coordonează întreaga activitate.",
        membri: [
          { nume: "Podeanu Denis", rol: "Președinte", an: "III EE", email: "", poza: "https://i.postimg.cc/k5wdfdZT/Logo-Liga-02.png" },
          { nume: "Golîmba Robert", rol: "Vicepreședinte Relații Externe", an: "III ET", email: "", poza: "https://i.postimg.cc/k5wdfdZT/Logo-Liga-02.png" },
          { nume: "Haicu Andreea", rol: "Vicepreședinte Relații Interne", an: "IV EE", email: "", poza: "https://i.postimg.cc/k5wdfdZT/Logo-Liga-02.png" },
           { nume: "Vasile Flavius", rol: "Secretar General", an: " I Master", email: "", poza: "https://i.postimg.cc/k5wdfdZT/Logo-Liga-02.png" },
          { nume: "Popa Denis", rol: "Director HR", an: "IV EE", email: "", poza: "https://i.postimg.cc/k5wdfdZT/Logo-Liga-02.png" },
          { nume: "Gîrghescu Lavinia", rol: "Director PR", an: "II ET", email: "", poza: "https://i.postimg.cc/k5wdfdZT/Logo-Liga-02.png" },
          { nume: "Andrița Bogdan", rol: "Director FR", an: "II EE", email: "", poza: "https://i.postimg.cc/k5wdfdZT/Logo-Liga-02.png" },
        ]
      },
      {
        id: 'cc',
       numeDepartament: "Comisia de Cenzori",
        descriere: "Păstrează ordinea în Organizație și oferă sancțiuni.",
        membri: [
          { nume: "Holovati Paul", rol: "Cenzor", an: "III ET", email: "holovatipaul11@gmail.com", poza: "https://i.postimg.cc/k5wdfdZT/Logo-Liga-02.png" },
        ]
      },
     // {
       // id: 'pr',
       // numeDepartament: "PR & Imagine",
       // descriere: "Cei care fac afișele și postările faine.",
       // membri: [
         // { nume: "Ioana Dinu", rol: "Coordonator PR", an: "III", email: "pr@lsfee.ro", poza: "https://randomuser.me/api/portraits/women/12.jpg" },
       // ]
     // }
    ]
  }
};

// ==================================================
// ⚙️ CODUL PROGRAMULUI (Functionalitate)
// ==================================================

// 1. Componenta Card Noutate cu Buton de Reminder
const CardNoutate = ({ item }) => (
  <View style={styles.card}>
    <View style={styles.cardHeaderRow}>
      <View style={{flex: 1}}>
        <Text style={styles.cardTitlu}>{item.titlu}</Text>
        <Text style={styles.cardData}>{item.data} • {item.loc}</Text>
      </View>
      <TouchableOpacity 
        style={styles.bellButton}
        onPress={() => Alert.alert("Notificare Setată", `Te vom anunța înainte de: ${item.titlu}`)}
      >
        <Ionicons name="notifications-outline" size={20} color="white" />
      </TouchableOpacity>
    </View>
    <Text style={styles.cardDescriere}>{item.info}</Text>
  </View>
);

// 2. Componenta Membru Echipa
const CardMembru = ({ membru }) => (
  <View style={styles.membruCard}>
    <Image source={{ uri: membru.poza }} style={styles.membruPoza} />
    <View style={styles.membruInfo}>
      <Text style={styles.membruNume}>{membru.nume}</Text>
      <Text style={styles.membruRol}>{membru.rol}</Text>
      <Text style={styles.membruDetalii}>Anul {membru.an} • {membru.email}</Text>
    </View>
  </View>
);

// --- ECRANELE ---

const EcranAcasa = () => (
  <ScrollView style={styles.scrolContainer} contentContainerStyle={styles.contentContainer}>
    <View style={styles.welcomeBox}>
       <Text style={styles.titluMare}>{CONFIG.texte.acasa.titlu}</Text>
       <Text style={styles.subtitlu}>{CONFIG.texte.acasa.descriere}</Text>
    </View>
    
    <Text style={styles.sectiuneTitlu}>Urmează în LSFEE</Text>
    {CONFIG.texte.acasa.noutati.map((item) => (
      <CardNoutate key={item.id} item={item} />
    ))}
    <View style={{height: 100}} /> 
  </ScrollView>
);

const EcranDespre = () => (
  <ScrollView style={styles.scrolContainer} contentContainerStyle={styles.contentContainer}>
     <Image source={{ uri: CONFIG.imagini.bannerDespre }} style={styles.bannerImage} />
    <Text style={styles.titluMare}>{CONFIG.texte.despre.titlu}</Text>
    <Text style={styles.paragraf}>{CONFIG.texte.despre.descriere}</Text>
    
    <View style={styles.infoBox}>
      <Ionicons name="location" size={24} color={CONFIG.culori.accent} />
      <Text style={styles.infoBoxText}>Bv. Vasile Pârvan, Nr.2,  Sala A022</Text>
    </View>
     <View style={styles.infoBox}>
      <Ionicons name="mail" size={24} color={CONFIG.culori.accent} />
      <Text style={styles.infoBoxText}>lsfee.upt@gmail.com</Text>
    </View>
    <View style={{height: 100}} />
  </ScrollView>
);

// Ecranul Echipa COMPLEX (Lista Departamente + Detalii)
const EcranEchipa = () => {
  const [departamentSelectat, setDepartamentSelectat] = useState(null);

  // Daca avem un departament selectat, aratam membrii
  if (departamentSelectat) {
    return (
      <ScrollView style={styles.scrolContainer} contentContainerStyle={styles.contentContainer}>
        <TouchableOpacity onPress={() => setDepartamentSelectat(null)} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={CONFIG.culori.primar} />
          <Text style={styles.backText}>Înapoi la Departamente</Text>
        </TouchableOpacity>

        <Text style={styles.titluMare}>{departamentSelectat.numeDepartament}</Text>
        <Text style={styles.paragraf}>{departamentSelectat.descriere}</Text>
        
        <Text style={styles.sectiuneTitlu}>Membri</Text>
        {departamentSelectat.membri.map((membru, index) => (
          <CardMembru key={index} membru={membru} />
        ))}
        <View style={{height: 100}} />
      </ScrollView>
    );
  }

  // Altfel, aratam lista de departamente
  return (
    <ScrollView style={styles.scrolContainer} contentContainerStyle={styles.contentContainer}>
      <Text style={styles.titluMare}>Structura LSFEE</Text>
      <Text style={styles.paragraf}>Biroul de Conducere și Comisia de Cenzori.</Text>

      {CONFIG.texte.echipa.map((dept) => (
        <TouchableOpacity 
          key={dept.id} 
          style={styles.deptCard}
          onPress={() => setDepartamentSelectat(dept)}
        >
          <View style={styles.iconCircle}>
             <Ionicons name="people" size={24} color="white" />
          </View>
          <View style={{flex: 1}}>
            <Text style={styles.deptText}>{dept.numeDepartament}</Text>
            <Text style={styles.deptSubText}>Vezi {dept.membri.length} membri</Text>
          </View>
          <Ionicons name="chevron-forward" size={24} color="#ccc" />
        </TouchableOpacity>
      ))}
      <View style={{height: 100}} />
    </ScrollView>
  );
};

export default function App() {
  const [paginaCurenta, setPaginaCurenta] = useState('Acasa');

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={CONFIG.culori.primar} />
      
      <View style={styles.topBar}>
        <Text style={styles.topBarText}>{CONFIG.numeApp}</Text>
      </View>

      <View style={styles.mainContent}>
        {paginaCurenta === 'Acasa' && <EcranAcasa />}
        {paginaCurenta === 'Despre' && <EcranDespre />}
        {paginaCurenta === 'Echipa' && <EcranEchipa />}
      </View>

      <View style={styles.navBar}>
        <NavButton nume="Acasă" icon="home" activ={paginaCurenta === 'Acasa'} onPress={() => setPaginaCurenta('Acasa')} />
        <NavButton nume="Echipă" icon="people" activ={paginaCurenta === 'Echipa'} onPress={() => setPaginaCurenta('Echipa')} />
        <NavButton nume="Despre" icon="information-circle" activ={paginaCurenta === 'Despre'} onPress={() => setPaginaCurenta('Despre')} />
      </View>
    </SafeAreaView>
  );
}

const NavButton = ({ nume, icon, activ, onPress }) => (
  <TouchableOpacity style={styles.navItem} onPress={onPress}>
    <Ionicons name={icon} size={24} color={activ ? CONFIG.culori.accent : '#8899a6'} />
    <Text style={[styles.navText, {color: activ ? CONFIG.culori.accent : '#8899a6'}]}>{nume}</Text>
  </TouchableOpacity>
);

// ==================================================
// 🎨 STILURI ACTUALIZATE
// ==================================================
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: CONFIG.culori.fundal },
  topBar: {
    backgroundColor: CONFIG.culori.primar, padding: 15, paddingTop: 40, alignItems: 'center', elevation: 4
  },
  topBarText: { color: 'white', fontSize: 20, fontWeight: 'bold' },
  mainContent: { flex: 1 },
  scrolContainer: { flex: 1 },
  contentContainer: { padding: 20 },
  
  // Header Acasa
  welcomeBox: { marginBottom: 20, alignItems: 'center' },
  titluMare: { fontSize: 26, fontWeight: 'bold', color: CONFIG.culori.textTitlu, marginBottom: 5, textAlign: 'center' },
  subtitlu: { fontSize: 16, color: '#666', textAlign: 'center' },
  sectiuneTitlu: { fontSize: 18, fontWeight: 'bold', color: CONFIG.culori.primar, marginTop: 20, marginBottom: 15, textTransform: 'uppercase', letterSpacing: 1 },
  paragraf: { fontSize: 15, color: CONFIG.culori.textNormal, lineHeight: 22, textAlign: 'justify', marginBottom: 20 },
  
  // Card Noutati cu Reminder
  card: {
    backgroundColor: CONFIG.culori.cardFundal, borderRadius: 12, padding: 15, marginBottom: 15,
    elevation: 2, shadowColor: "#000", shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.1
  },
  cardHeaderRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 },
  cardTitlu: { fontSize: 18, fontWeight: 'bold', color: CONFIG.culori.primar },
  cardData: { fontSize: 13, color: CONFIG.culori.accent, fontWeight: 'bold', marginTop: 2 },
  cardDescriere: { color: '#555', fontSize: 14 },
  bellButton: { backgroundColor: CONFIG.culori.primar, padding: 8, borderRadius: 20 },

  // Carduri Departamente (Echipa)
  deptCard: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: 'white', padding: 15, borderRadius: 12, marginBottom: 12,
    elevation: 2
  },
  iconCircle: { width: 40, height: 40, borderRadius: 20, backgroundColor: CONFIG.culori.primar, alignItems: 'center', justifyContent: 'center', marginRight: 15 },
  deptText: { fontSize: 17, fontWeight: 'bold', color: CONFIG.culori.textTitlu },
  deptSubText: { fontSize: 12, color: '#888' },

  // Membru Echipa Detaliat
  membruCard: { flexDirection: 'row', backgroundColor: 'white', padding: 10, borderRadius: 10, marginBottom: 10, alignItems: 'center', elevation: 1 },
  membruPoza: { width: 60, height: 60, borderRadius: 30, marginRight: 15 },
  membruInfo: { flex: 1 },
  membruNume: { fontSize: 16, fontWeight: 'bold', color: '#333' },
  membruRol: { fontSize: 14, color: CONFIG.culori.accent, fontWeight: 'bold' },
  membruDetalii: { fontSize: 12, color: '#777', marginTop: 2 },

  // Back Button
  backButton: { flexDirection: 'row', alignItems: 'center', marginBottom: 20 },
  backText: { fontSize: 16, color: CONFIG.culori.primar, marginLeft: 5, fontWeight: '600' },

  // Despre
  bannerImage: { width: '100%', height: 180, borderRadius: 12, marginBottom: 20 },
  infoBox: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'white', padding: 15, borderRadius: 10, marginBottom: 10 },
  infoBoxText: { marginLeft: 15, color: '#555' },

  // Nav Bar
  navBar: { flexDirection: 'row', backgroundColor: 'white', paddingVertical: 10, borderTopWidth: 1, borderTopColor: '#eee' },
  navItem: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  navText: { fontSize: 11, marginTop: 4, fontWeight: 'bold' },
});
