import React, { useState, useEffect, useRef } from 'react';
import { 
  StyleSheet, Text, View, ScrollView, TouchableOpacity, Image, 
  StatusBar, SafeAreaView, Animated, Easing, Dimensions 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// ==================================================
// 🛠️ ZONA DE CONFIGURARE
// ==================================================

const CONFIG = {
  numeApp: "LSFEE Info",
  
  culori: {
    primar: '#001a33',       // Albastru inchis
    secundar: '#004d99',     // Albastru mediu
    accent: '#00ccff',       // Cian
    fundal: '#f4f9ff',       // Albastru-alb gheata
    textTitlu: '#00264d',
    textNormal: '#556677',
    cardFundal: '#ffffff',
  },

  imagini: {
    bannerDespre: 'https://i.postimg.cc/L6GRX1nV/Logo-Liga-02.png', 
  },

  texte: {
    acasa: {
      titlu: "Salutare, Voluntarule!",
      descriere: "Fii la curent cu pulsul facultății! Calendarul activităților tale este aici.",
      noutati: [
        { id: 1, titlu: "Cafeaua Electrizantă", data: "8-12 Dec • 10:00-18:00", loc: "📍 Holul Electro", info: "Completarea Chestionarului Codul Drepturilor și Obligațiilor Studentului." },
        { id: 2, titlu: "Colinde", data: "Marți 16 Dec", loc: "📍 Facultate", info: "Ne colindăm profesorii în spirit de sărbători." },
      ]
    },
    despre: {
      titlu: "Cine suntem?",
      descriere: "Înfiinţată în anul 1990, Liga Studenților din Facultatea de Inginerie Electrică și Energetică (LSFEE) este o organizaţie studențească nonprofit, cu caracter socio-profesional, autonomă.",
      
      proiecte: [
        {
          id: 'p1',
          titlu: "Descoperă Electro",
          descriere: "Proiect dedicat bobocilor pentru a cunoaște mai bine facultatea.",
          detalii: "Se desfăşoară pe 3 etape în prima săptămână a anului universitar. Include vizitarea sălilor de curs, amfiteatrelor şi a laboratoarelor.",
          perioada: "Începutul anului universitar",
          poza: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&q=80" 
        },
        {
          id: 'p2',
          titlu: "Cupa Poli",
          descriere: "Eveniment sportiv sub sloganul PLAY, FIGHT & WIN.",
          detalii: "Promovează ideea de competiție, spiritul de echipă și fair-play-ul. Se desfășoară pe durata a 1-2 luni în semestrul al doilea.",
          perioada: "Semestrul 2",
          poza: "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?auto=format&fit=crop&w=800&q=80"
        },
        {
          id: 'p3',
          titlu: "Sesiunea de Comunicări",
          descriere: "Oportunitate academică de prestigiu pentru studenți.",
          detalii: "Studenții prezintă o lucrare științifică. Pot obține un coeficient ISSN recunoscut internațional.",
          perioada: "Luna Mai",
          poza: "https://images.unsplash.com/photo-1581093458791-9f3c3900df4b?auto=format&fit=crop&w=800&q=80"
        },
        {
          id: 'p4',
          titlu: "Colinde",
          descriere: "Păstrarea tradițiilor și a spiritului de sărbătoare.",
          detalii: "În pragul sărbătorilor de iarnă, colindăm studenţii şi cadrele didactice. Proiectul capătă o amploare culturală prin diversitatea zonelor de proveniență a studenților.",
          perioada: "Decembrie",
          poza: "https://images.unsplash.com/photo-1512389142860-9c449e58a543?auto=format&fit=crop&w=800&q=80"
        },
        {
          id: 'p5',
          titlu: "Team Building",
          descriere: "Formarea și consolidarea echipei LSFEE.",
          detalii: "Organizat semestrial. TB-ul de AG are ca scop integrarea recruților. TB-ul de BC vizează realizarea strategiei.",
          perioada: "Semestrial",
          poza: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80"
        },
        {
          id: 'p6',
          titlu: "Recrutări",
          descriere: "Procesul prin care atragem noi forțe în organizație.",
          detalii: "Organizația invită studenții să se implice în activități de voluntariat. Se desfășoară în două perioade: toamna (la debutul anului) și primăvara (Martie).",
          perioada: "Octombrie & Martie",
          poza: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=800&q=80"
        }
      ]
    },
    echipa: [
      {
        id: 'birou',
        numeDepartament: "Biroul de Conducere",
        descriere: "Cei care coordonează întreaga activitate.",
        membri: [
          { nume: "Podeanu Denis", rol: "Președinte", an: "III EE", email: "", poza: "https://i.postimg.cc/k5wdfdZT/Logo-Liga-02.png" },
          { nume: "Golîmba Robert", rol: "Vicepreședinte Relații Externe", an: "III ET", email: "", poza: "https://i.postimg.cc/k5wdfdZT/Logo-Liga-02.png" },
          { nume: "Haicu Andreea", rol: "Vicepreședinte Relații Interne", an: "IV EE", email: "", poza: "https://i.postimg.cc/k5wdfdZT/Logo-Liga-02.png" },
          { nume: "Vasile Flavius", rol: "Secretar General", an: "I Master", email: "", poza: "https://i.postimg.cc/k5wdfdZT/Logo-Liga-02.png" },
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
    ]
  }
};

// ==================================================
// 🧩 COMPONENTE UI
// ==================================================

const CardNoutate = ({ item }) => (
  <View style={styles.cardContainer}>
    <View style={styles.cardAccent} />
    <View style={styles.cardContent}>
      <Text style={styles.cardTitlu}>{item.titlu}</Text>
      <View style={styles.badgeData}>
        <Ionicons name="calendar" size={12} color="white" style={{marginRight: 4}} />
        <Text style={styles.textData}>{item.data}</Text>
      </View>
      <Text style={styles.textLoc}>{item.loc}</Text>
      <Text style={styles.cardDescriere}>{item.info}</Text>
    </View>
  </View>
);

const CardMembru = ({ membru }) => (
  <View style={styles.membruCard}>
    <Image 
      source={{ uri: membru.poza }} 
      style={styles.membruPoza} 
      resizeMode="cover"
    />
    <View style={styles.membruInfo}>
      <Text style={styles.membruNume}>{membru.nume}</Text>
      <Text style={styles.membruRol}>{membru.rol}</Text>
      <View style={styles.separator} />
      <Text style={styles.membruDetalii}>Anul {membru.an}</Text>
      {membru.email ? <Text style={styles.membruEmail}>{membru.email}</Text> : null}
    </View>
  </View>
);

const CardProiect = ({ proiect, onPress }) => (
  <TouchableOpacity onPress={onPress} activeOpacity={0.8} style={styles.proiectCard}>
    <Image 
      source={{ uri: proiect.poza }} 
      style={styles.proiectImagine} 
      resizeMode="cover" 
    />
    <View style={styles.proiectContent}>
      <Text style={styles.proiectTitlu}>{proiect.titlu}</Text>
      <Text style={styles.proiectDescriere} numberOfLines={2}>{proiect.descriere}</Text>
      <View style={styles.readMoreRow}>
        <Text style={styles.readMoreText}>Află mai multe</Text>
        <Ionicons name="arrow-forward" size={16} color={CONFIG.culori.accent} />
      </View>
    </View>
  </TouchableOpacity>
);

// --- ECRANELE ---

const EcranAcasa = () => (
  <ScrollView style={styles.scrolContainer} contentContainerStyle={styles.contentContainer}>
    <View style={styles.welcomeBox}>
       <Text style={styles.titluMare}>{CONFIG.texte.acasa.titlu}</Text>
       <Text style={styles.subtitlu}>{CONFIG.texte.acasa.descriere}</Text>
    </View>
    
    <Text style={styles.sectiuneTitlu}>📅 Urmează în LSFEE</Text>

    {CONFIG.texte.acasa.noutati.map((item, index) => (
      <CardNoutate key={item.id} item={item} index={index + 2} /> 
    ))}
    <View style={{height: 100}} /> 
  </ScrollView>
);

const EcranProiectDetaliat = ({ proiect, onBack }) => (
  <ScrollView style={styles.scrolContainer}>
    <Image source={{ uri: proiect.poza }} style={styles.proiectDetailImage} resizeMode="cover" />
    
    <View style={styles.proiectDetailContainer}>
      <TouchableOpacity onPress={onBack} style={styles.backButtonDetail}>
        <Ionicons name="chevron-back" size={30} color="white" />
      </TouchableOpacity>

      <Text style={styles.proiectDetailTitle}>{proiect.titlu}</Text>
      
      <View style={styles.badgeData}>
        <Ionicons name="time-outline" size={14} color="white" style={{marginRight: 5}} />
        <Text style={styles.textData}>{proiect.perioada}</Text>
      </View>

      <View style={styles.divider} />

      <Text style={styles.sectiuneSubtitlu}>Despre Proiect</Text>
      <Text style={styles.paragraf}>{proiect.descriere}</Text>

      <Text style={styles.sectiuneSubtitlu}>Detalii & Obiective</Text>
      <Text style={styles.paragraf}>{proiect.detalii}</Text>
    </View>
    <View style={{height: 100}} />
  </ScrollView>
);

const EcranDespre = () => {
  const [proiectSelectat, setProiectSelectat] = useState(null);

  if (proiectSelectat) {
    return <EcranProiectDetaliat proiect={proiectSelectat} onBack={() => setProiectSelectat(null)} />;
  }

  return (
    <ScrollView style={styles.scrolContainer} contentContainerStyle={styles.contentContainer}>
      <Image source={{ uri: CONFIG.imagini.bannerDespre }} style={styles.bannerImage} resizeMode="contain" />
      
      <View style={styles.cardSimplu}>
        <Text style={styles.titluMediu}>{CONFIG.texte.despre.titlu}</Text>
        <Text style={styles.paragraf}>{CONFIG.texte.despre.descriere}</Text>
      </View>
      
      <View style={styles.rowContainer}>
        <View style={[styles.infoCard, {marginRight: 10}]}>
          <View style={styles.iconBula}>
            <Ionicons name="location" size={24} color={CONFIG.culori.accent} />
          </View>
          <Text style={styles.infoBoxText}>Sala A022</Text>
        </View>
        <View style={styles.infoCard}>
          <View style={styles.iconBula}>
            <Ionicons name="mail" size={24} color={CONFIG.culori.accent} />
          </View>
          <Text style={styles.infoBoxText}>lsfee.upt@gmail.com</Text>
        </View>
      </View>

      <Text style={[styles.sectiuneTitlu, {marginTop: 30}]}>🚀 Proiectele Noastre</Text>
      
      {CONFIG.texte.despre.proiecte.map((proiect, index) => (
        <CardProiect 
          key={proiect.id} 
          proiect={proiect} 
          index={index} 
          onPress={() => setProiectSelectat(proiect)}
        />
      ))}

      <View style={{height: 100}} />
    </ScrollView>
  );
};

const EcranEchipa = () => {
  const [departamentSelectat, setDepartamentSelectat] = useState(null);

  if (departamentSelectat) {
    return (
      <ScrollView style={styles.scrolContainer} contentContainerStyle={styles.contentContainer}>
        <View style={{flexDirection: 'row', alignItems: 'center', marginBottom: 20}}>
          <TouchableOpacity onPress={() => setDepartamentSelectat(null)} style={{padding: 5, marginRight: 10}}>
            <Ionicons name="arrow-back" size={32} color={CONFIG.culori.primar} />
          </TouchableOpacity>
          <Text style={styles.titluPagina}>{departamentSelectat.numeDepartament}</Text>
        </View>

        <Text style={styles.descriereDept}>{departamentSelectat.descriere}</Text>
        
        {departamentSelectat.membri.map((membru, index) => (
          <CardMembru key={index} membru={membru} index={index} />
        ))}
        <View style={{height: 100}} />
      </ScrollView>
    );
  }

  return (
    <ScrollView style={styles.scrolContainer} contentContainerStyle={styles.contentContainer}>
      <Text style={styles.titluMare}>Structura LSFEE</Text>
      <Text style={styles.paragrafCenter}>Organigrama echipei noastre.</Text>

      {CONFIG.texte.echipa.map((dept, index) => (
        <TouchableOpacity key={dept.id} onPress={() => setDepartamentSelectat(dept)} style={styles.deptCard}>
          <View style={[styles.deptIconBox, {backgroundColor: CONFIG.culori.primar}]}>
             <Ionicons name="people" size={24} color="white" />
          </View>
          <View style={{flex: 1}}>
            <Text style={styles.deptText}>{dept.numeDepartament}</Text>
            <Text style={styles.deptSubText}>{dept.membri.length} membri activi</Text>
          </View>
          <View style={styles.arrowBox}>
             <Ionicons name="chevron-forward" size={16} color={CONFIG.culori.accent} />
          </View>
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
        <View style={styles.headerRow}>
          <Text style={styles.topBarText}>{CONFIG.numeApp}</Text>
        </View>
      </View>

      <View style={styles.mainContent}>
        {paginaCurenta === 'Acasa' && <EcranAcasa />}
        {paginaCurenta === 'Despre' && <EcranDespre />}
        {paginaCurenta === 'Echipa' && <EcranEchipa />}
      </View>

      <View style={styles.navBarContainer}>
        <View style={styles.navBar}>
          <TabButton nume="Acasă" icon="home-outline" iconActiv="home" set={setPaginaCurenta} activ={paginaCurenta === 'Acasa'} tinta="Acasa" />
          <TabButton nume="Echipă" icon="people-outline" iconActiv="people" set={setPaginaCurenta} activ={paginaCurenta === 'Echipa'} tinta="Echipa" />
          <TabButton nume="Despre" icon="information-circle-outline" iconActiv="information-circle" set={setPaginaCurenta} activ={paginaCurenta === 'Despre'} tinta="Despre" />
        </View>
      </View>
    </SafeAreaView>
  );
}

const TabButton = ({ nume, icon, iconActiv, set, activ, tinta }) => (
  <TouchableOpacity onPress={() => set(tinta)} style={styles.navItem} activeOpacity={0.8}>
    <View style={[styles.iconContainer, activ && styles.iconContainerActiv]}>
      <Ionicons name={activ ? iconActiv : icon} size={26} color={activ ? CONFIG.culori.accent : '#8899a6'} />
    </View>
    <Text style={[styles.navText, {color: activ ? CONFIG.culori.accent : '#8899a6'}]}>{nume}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: CONFIG.culori.fundal },
  
  topBar: {
    padding: 15, paddingTop: 40, alignItems: 'center', elevation: 10,
    backgroundColor: CONFIG.culori.primar,
    borderBottomLeftRadius: 20, borderBottomRightRadius: 20,
    marginBottom: 5,
  },
  headerRow: { flexDirection: 'row', alignItems: 'center' },
  topBarText: { color: 'white', fontSize: 22, fontWeight: '800', letterSpacing: 1 },
  
  mainContent: { flex: 1 },
  scrolContainer: { flex: 1 },
  contentContainer: { padding: 20 },

  titluMare: { fontSize: 28, fontWeight: '800', color: CONFIG.culori.textTitlu, marginBottom: 8, textAlign: 'center' },
  subtitlu: { fontSize: 16, color: '#667788', textAlign: 'center', lineHeight: 22 },
  sectiuneTitlu: { fontSize: 20, fontWeight: '700', color: CONFIG.culori.textTitlu, marginTop: 25, marginBottom: 15 },
  sectiuneSubtitlu: { fontSize: 18, fontWeight: '700', color: CONFIG.culori.textTitlu, marginTop: 20, marginBottom: 10 },
  titluPagina: { fontSize: 20, fontWeight: 'bold', color: CONFIG.culori.textTitlu, marginLeft: 5, flex: 1, flexWrap: 'wrap' },
  
  cardContainer: {
    backgroundColor: 'white', borderRadius: 16, marginBottom: 16, overflow: 'hidden',
    shadowColor: "#004d99", shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.1, shadowRadius: 10, elevation: 5,
    flexDirection: 'row'
  },
  cardAccent: { width: 6, backgroundColor: CONFIG.culori.accent },
  cardContent: { padding: 16, flex: 1 },
  cardTitlu: { fontSize: 18, fontWeight: 'bold', color: CONFIG.culori.textTitlu, marginBottom: 5 },
  badgeData: { 
    alignSelf: 'flex-start', backgroundColor: CONFIG.culori.secundar, paddingHorizontal: 10, paddingVertical: 4, 
    borderRadius: 8, flexDirection: 'row', alignItems: 'center', marginBottom: 5 
  },
  textData: { color: 'white', fontSize: 11, fontWeight: 'bold' },
  textLoc: { color: '#8899a6', fontSize: 13, marginBottom: 8, fontStyle: 'italic' },
  cardDescriere: { color: '#445566', fontSize: 14, lineHeight: 20 },

  proiectCard: {
    backgroundColor: 'white', borderRadius: 16, marginBottom: 20, overflow: 'hidden',
    elevation: 4, shadowColor: "#000", shadowOpacity: 0.1, shadowOffset: {width: 0, height: 4}
  },
  proiectImagine: { width: '100%', height: 160, backgroundColor: '#eee' },
  proiectContent: { padding: 15 },
  proiectTitlu: { fontSize: 18, fontWeight: 'bold', color: CONFIG.culori.textTitlu, marginBottom: 5 },
  proiectDescriere: { fontSize: 14, color: '#556677', lineHeight: 20, marginBottom: 10 },
  readMoreRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' },
  readMoreText: { color: CONFIG.culori.accent, fontWeight: 'bold', fontSize: 12, marginRight: 5 },

  proiectDetailImage: { width: '100%', height: 250 },
  proiectDetailContainer: { padding: 20, backgroundColor: 'white', borderTopLeftRadius: 30, borderTopRightRadius: 30, marginTop: -30, minHeight: 500 },
  proiectDetailTitle: { fontSize: 24, fontWeight: 'bold', color: CONFIG.culori.textTitlu, marginBottom: 10, marginTop: 10 },
  backButtonDetail: { 
    position: 'absolute', top: -230, left: 20, width: 45, height: 45, borderRadius: 25, 
    backgroundColor: 'rgba(0,0,0,0.6)', justifyContent: 'center', alignItems: 'center', zIndex: 10
  },
  divider: { height: 1, backgroundColor: '#eee', marginVertical: 20 },

  bannerImage: { width: '100%', height: 200, backgroundColor: 'white', borderRadius: 20, marginBottom: 20 },
  cardSimplu: { backgroundColor: 'white', padding: 20, borderRadius: 20, shadowColor: "#000", shadowOpacity: 0.05, elevation: 2, marginBottom: 20 },
  titluMediu: { fontSize: 22, fontWeight: 'bold', color: CONFIG.culori.textTitlu, marginBottom: 10 },
  paragraf: { fontSize: 15, color: '#556677', lineHeight: 24, textAlign: 'justify' },
  paragrafCenter: { fontSize: 15, color: '#556677', textAlign: 'center', marginBottom: 20 },
  
  rowContainer: { flexDirection: 'row', justifyContent: 'space-between' },
  
  infoCard: { 
    flex: 1, backgroundColor: 'white', padding: 15, borderRadius: 16, alignItems: 'center',
    shadowColor: "#000", shadowOpacity: 0.05, elevation: 3
  },
  iconBula: { width: 45, height: 45, borderRadius: 25, backgroundColor: '#e6f7ff', alignItems: 'center', justifyContent: 'center', marginBottom: 8 },
  infoBoxText: { fontSize: 12, fontWeight: '600', color: CONFIG.culori.textTitlu, textAlign: 'center' },

  deptCard: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: 'white', padding: 12, borderRadius: 16, marginBottom: 12,
    shadowColor: "#000", shadowOpacity: 0.08, shadowRadius: 5, elevation: 3
  },
  deptIconBox: { 
    width: 50, height: 50, borderRadius: 14, alignItems: 'center', justifyContent: 'center', marginRight: 15,
    backgroundColor: CONFIG.culori.primar
  },
  deptText: { fontSize: 17, fontWeight: 'bold', color: CONFIG.culori.textTitlu },
  deptSubText: { fontSize: 12, color: '#8899a6', marginTop: 2 },
  arrowBox: { width: 30, height: 30, borderRadius: 15, backgroundColor: '#f0f8ff', alignItems: 'center', justifyContent: 'center' },

  membruCard: { 
    flexDirection: 'row', backgroundColor: 'white', padding: 12, borderRadius: 16, marginBottom: 12, alignItems: 'center',
    shadowColor: "#000", shadowOpacity: 0.05, elevation: 2
  },
  membruPoza: { width: 65, height: 65, borderRadius: 32.5, marginRight: 15, borderWidth: 2, borderColor: '#f0f8ff' },
  membruInfo: { flex: 1 },
  membruNume: { fontSize: 16, fontWeight: 'bold', color: '#223344' },
  membruRol: { fontSize: 13, color: CONFIG.culori.accent, fontWeight: '700', flexWrap: 'wrap', flexShrink: 1 },
  separator: { height: 1, backgroundColor: '#eee', marginVertical: 6, width: '30%' },
  membruDetalii: { fontSize: 12, color: '#8899a6' },
  membruEmail: { fontSize: 11, color: '#aabbcc', marginTop: 2 },

  navBarContainer: {
    backgroundColor: 'white',
    borderTopLeftRadius: 25, 
    borderTopRightRadius: 25, 
    shadowColor: "#000", 
    shadowOffset: {width: 0, height: -5}, 
    shadowOpacity: 0.08, 
    elevation: 20,
    paddingBottom: 20, 
  },
  navBar: { 
    flexDirection: 'row', 
    justifyContent: 'space-around', 
    alignItems: 'center',
    paddingTop: 12,
    paddingHorizontal: 20,
  },
  navItem: { 
    alignItems: 'center', 
    justifyContent: 'center',
    minWidth: 70, 
  },
  iconContainer: { marginBottom: 4 },
  iconContainerActiv: { 
    transform: [{ translateY: -3 }] 
  },
  navText: { fontSize: 11, fontWeight: '600', textAlign: 'center' },
});