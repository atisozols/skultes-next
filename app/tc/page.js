import Main from '../../components/layout/Main';
import Link from 'next/link';

const Page = () => {
  return (
    <Main>
      <div className="container mx-auto max-w-4xl px-4 py-8">
        <div className="mb-8 flex flex-col items-center justify-center">
          <Link href="/" className="mb-6 text-accent hover:underline">
            ← Atpakaļ uz sākumlapu
          </Link>
          <h1 className="bakbak mb-4 text-center text-3xl font-semibold md:text-4xl">
            Iekšējās kārtības noteikumi
          </h1>
          <p className="mt-4 text-sm text-alternate">
            Pēdējo reizi atjaunināts: 2026. gada 12. aprīlis
          </p>
        </div>

        <div className="prose-invert prose-accent prose mx-auto max-w-none">
          <ol className="list-decimal space-y-12 pl-5 text-gray-200">
            <li>
              <h2 className="mb-3 text-xl font-medium text-accent">Ievads</h2>
              <ol className="list-decimal space-y-3 pl-5">
                <li>
                  Izmantojot ozols.club un Ozols sporta kluba sniegtos pakalpojumus, klients
                  apstiprina, ka ir iepazinies ar un piekrīt šiem Lietošanas noteikumiem, Naudas
                  atgriešanas noteikumiem un Privātuma politikai.
                </li>
                <li>
                  Iegādājoties Ozols sporta kluba abonementu, klients piekrīt sporta kluba
                  iekšējās kārtības noteikumiem.
                </li>
                <li>
                  Visa personas informācija, kas tiek sniegta sporta klubam, iegādājoties
                  abonementu un aizpildot reģistrācijas lapu, tiks izmantota tikai kluba datu
                  apstrādes un klientu informēšanas nolūkiem.
                </li>
                <li>
                  Sporta klubs ir tiesīgs grozīt noteikumus, paziņojot par izmaiņām iepriekš
                  mājaslapā. Ja klients nepaziņo par atteikšanos un turpina pakalpojumu lietošanu,
                  uzskatāms, ka izmaiņas ir pieņemtas.
                </li>
              </ol>
            </li>

            <li>
              <h2 className="mb-3 text-xl font-medium text-accent">Vispārīgie noteikumi</h2>
              <ol className="list-decimal space-y-3 pl-5">
                <li>
                  Reģistrējoties, klients piekrīt, ka Ozols sporta klubs apstrādā viņa personas
                  datus (vārdu, uzvārdu, tālruņa numuru un e-pasta adresi) līguma noslēgšanai un
                  izpildei, klienta identifikācijai un reģistrācijai, kluba apmeklējuma
                  nodrošināšanai, mārketinga kampaņām, iekšējās statistikas sagatavošanai un
                  saziņai ar klientu.
                </li>
                <li>
                  Sporta klubu individuāli var izmantot personas, kas vecākas par 15 gadiem.
                  Personas vecumā no 12 līdz 15 gadiem drīkst izmantot sporta zāli tikai
                  pieaugušā pavadībā. Drošības apsvērumu dēļ personām, kas jaunākas par 15
                  gadiem, nav atļauts apmeklēt sporta klubu, neievērojot iepriekš minētos
                  nosacījumus. Klientam, kurš ir jaunāks par 18 gadiem, vecāki vai likumīgie
                  aizbildņi ir atbildīgi par visu saistībās noteikto pienākumu izpildi.
                </li>
                <li>
                  Ozols sporta kluba pakalpojumi ir pieejami gan kluba biedriem, gan tiem, kuri
                  izvēlas vienreizēju apmeklējumu. Visiem kluba apmeklētājiem apmeklējuma laikā
                  jāievēro noteiktā iekšējā kārtība.
                </li>
                <li>
                  Sporta klubam ir tiesības mainīt darba laiku, cenrādi un citus ar kluba darbību
                  saistītus jautājumus.
                </li>
                <li>
                  Sporta klubam ir tiesības veikt jebkāda veida uzturēšanu, tīrīšanu un remontu
                  sporta klubā. Klienti tiek informēti savlaicīgi par plānotajiem uzturēšanas
                  darbiem, ja tie var ietekmēt sporta kluba darba laiku vai citus ar klientu
                  interesēm tieši saistītus apstākļus. Sporta klubs neveic kompensācijas par
                  uzturēšanas darbu dēļ veiktajām darba laika izmaiņām vai radītajām īslaicīgajām
                  neērtībām.
                </li>
                <li>
                  Sporta klubam ir tiesības atcelt vai pārcelt plānotos treniņus, ja tos nav
                  iespējams nodrošināt organizatorisku vai tehnisku iemeslu dēļ.
                </li>
                <li>
                  Lai nodrošinātu apmeklētāju drošību, klubā darbojas video novērošana.
                </li>
              </ol>
            </li>

            <li>
              <h2 className="mb-3 text-xl font-medium text-accent">Apmeklētāju pienākumi</h2>
              <ol className="list-decimal space-y-3 pl-5">
                <li>
                  Sporta kluba apmeklētājiem ir pienākums uzturēt tīrību un kārtību, kā arī
                  ievērot cieņpilnu attieksmi pret citiem. Uzturoties kluba telpās, biedriem ir
                  jārespektē pārējo apmeklētāju miers un labsajūta.
                </li>
                <li>
                  Katram biedram ir pienākums lietot kluba inventāru atbildīgi un tikai tam
                  paredzētajā veidā. Aizliegts mest sporta aprīkojumu uz grīdas, jo tas var radīt
                  bojājumus telpām un aprīkojumam.
                </li>
                <li>
                  Sporta kluba biedriem ir jāievēro inventāra lietošanas kārtība — pēc
                  nodarbībām vai individuāliem treniņiem izmantotais aprīkojums jānovieto atpakaļ
                  tam paredzētajās vietās. Velo trenažieri pēc lietošanas jānotīra, skrejceliņi
                  jāatgriež sākuma stāvoklī, savukārt pārējais inventārs pēc katras lietošanas
                  reizes jātīra ar kluba nodrošinātajiem dezinfekcijas līdzekļiem. Sporta kluba
                  apmeklētājiem ir pienākums telpās lietot tikai klubam piederošos un tam
                  nodrošinātos dezinfekcijas līdzekļus, kas paredzēti rokām un virsmām.
                </li>
                <li>
                  Sporta kluba telpās biedriem ir pienākums lietot sporta nodarbībām piemērotu
                  apģērbu un maiņas apavus, kas nav izmantoti ārpus telpām. Sporta zālē nav atļauts
                  atrasties basām kājām vai valkāt apavus, kas nav paredzēti sportam (piemēram,
                  sandales), savukārt dušas telpās higiēnas nolūkos ieteicams izmantot čības.
                </li>
                <li>
                  Sporta kluba telpās ir aizliegts smēķēt, lietot alkoholiskos dzērienus, kā arī
                  uzturēties apreibinošo vielu ietekmē.
                </li>
                <li>Sporta kluba telpās nav atļauts lietot līdzi paņemtu pārtiku.</li>
                <li>
                  Sporta kluba telpās nav pieļaujama skūšanās, matu krāsošana, veļas žāvēšana vai
                  jebkādu citu darbību veikšana, kas neatbilst telpu paredzētajam lietojumam.
                </li>
                <li>
                  Dušas telpās aizliegts izmantot ķermeņa un sejas kopšanas produktus, piemēram,
                  eļļas, sāļus vai medu.
                </li>
                <li>
                  Kluba abonaments ir individuāls un nav nododams trešajām personām. Abonementa
                  izmantošana citai personai ir uzskatāma par pārkāpumu, un šādā gadījumā sporta
                  klubam ir tiesības abonementu anulēt vai piemērot vienreizējā apmeklējuma maksu
                  saskaņā ar cenrādi par katru konstatēto gadījumu.
                </li>
                <li>
                  Sporta kluba administrācijas darbiniekiem ir tiesības pieprasīt klientam uzrādīt
                  personu apliecinošu dokumentu, un biedram šādā gadījumā ir pienākums iesniegt
                  derīgu dokumentu.
                </li>
                <li>
                  Sporta kluba telpās pakalpojumu sniegšana ir pieļaujama tikai kluba
                  administrācijas pilnvarotām personām. Kluba biedriem nav tiesību nodarboties ar
                  treniņu vadīšanu, konsultāciju sniegšanu vai citām līdzīgām darbībām bez
                  rakstiskas administrācijas atļaujas. Ja klients sniedz trenera pakalpojumus bez
                  atļaujas un neievēro darbinieku aizrādījumus, sporta klubam ir tiesības izbeigt
                  līgumu, liegt turpmāku apmeklējumu, un abonements šādā gadījumā netiek atmaksāts.
                </li>
                <li>
                  Sporta kluba izmantošana ir pieļaujama tikai klienta rezervētajā laikā, un kluba
                  telpās drīkst atrasties tikai rezervāciju veikušais klients un personas, kuru
                  dalība iepriekš saskaņota ar klientu. Trešajām personām bez šādas saskaņošanas
                  atrasties klubā ir aizliegts.
                </li>
                <li>
                  Ja klients nav spējīgs ierasties uz treniņu laikā, kurā veikta rezervācija,
                  klientam ir pienākums atcelt rezervāciju. Atceļot rezervāciju vismaz 24 stundu
                  laikā pirms rezervētā laika vai 5 minūšu laikā pēc rezervācijas veikšanas,
                  klients saņem atlaidi nākamajai rezervācijai atceltās rezervācijas vērtībā.
                </li>
                <li>Rezervāciju grupu nodarbībām iespējams veikt online.</li>
                <li>
                  Nepietiekama iesildīšanās būtiski palielina traumu risku, tādēļ kavējot grupu
                  nodarbību, klients var zaudēt rezervēto vietu, ko klubs ir tiesīgs piešķirt citam
                  dalībniekam. Trenerim ir tiesības atteikt nokavējuša klienta dalību nodarbībā,
                  pat ja vieta iepriekš rezervēta.
                </li>
                <li>
                  Trenažieru zālē var tikt organizētas grupu nodarbības saskaņā ar noteikto grafiku.
                  Nodarbību norises laikā apmeklētājiem, kuri nav reģistrējušies dalībai, ir
                  aizliegts traucēt nodarbības gaitu vai izmantot attiecīgajā zonā izvietoto
                  inventāru.
                </li>
                <li>
                  Klients pats ir atbildīgs par savu veselības stāvokli un treniņu procesu sporta
                  klubā. Veselības problēmu gadījumā klientam ieteicams konsultēties ar savu ārstu.
                  Klientam ir pienākums nekavējoties informēt treneri par jebkādiem savainojumiem
                  vai traumām, kā arī sniegt informāciju sporta klubam un trenerim par esošām
                  traumām ne vēlāk kā pirms treniņa sākuma.
                </li>
                <li>
                  Sporta klubs neatbild par klienta saslimšanām vai nelaimes gadījumiem, ja tie
                  radušies klienta paša rīcības vai nepārvaramas varas apstākļu dēļ.
                </li>
                <li>
                  Sporta klubs nenes atbildību par klientu personīgajām mantām un neuzņemas
                  pienākumu nodrošināt to glabāšanu.
                </li>
                <li>
                  Ģērbtuvju skapīši paredzēti izmantošanai tikai kluba darba laikā un nodarbību
                  apmeklējuma laikā. Personīgās mantas nedrīkst atstāt skapīšos ārpus nodarbību
                  vai kluba darba laika. Pēc kluba darba laika beigām skapīšos atstātas lietas tiek
                  uzskatītas par pamestām, un klubs ir tiesīgs tās izņemt, katru dienu nodrošinot
                  skapīšu atbrīvošanu.
                </li>
                <li>
                  Pēc skapīša izmantošanas klientam ir pienākums atstāt atslēgu skapītī. Ja atslēga
                  tiek sabojāta, klients sedz remonta vai nomaiņas izmaksas saskaņā ar kluba
                  cenrādi.
                </li>
                <li>Biedram ir jāpamet klubs pirms tas tiek slēgts.</li>
                <li>
                  Fotografēšana un filmēšana sporta kluba telpās, tostarp ģērbtuvēs, ir pieļaujama
                  tikai personiskām vajadzībām. Jebkāda cita veida foto vai video materiālu iegūšana
                  ir iepriekš jāsaskaņo ar kluba administrāciju, sazinoties rakstiski ar klubu.
                  Veicot fotografēšanu vai filmēšanu personīgām vajadzībām, klienta pienākums ir
                  nodrošināt, ka materiālos netiek fiksētas citas personas.
                </li>
                <li>
                  Ja klients pārkāpj sporta kluba noteikumus vai neveic maksājumus, klubam ir
                  tiesības liegt viņam piekļuvi un pakalpojumu saņemšanu līdz pārkāpuma novēršanai.
                </li>
                <li>
                  Ja tiek konstatēta zādzība, ko veicis kluba klients vai viesis, nekavējoties spēkā
                  stājas aizliegums apmeklēt klubu uz nenoteiktu laika periodu un nauda par aktīvo
                  abonamentu netiek atgriezta. Klubam ir tiesības pieprasīt kompensāciju par
                  zaudējumiem, kas radušies zādzības rezultātā.
                </li>
                <li>
                  Noteikumu pārkāpuma vai rupjas uzvedības gadījumā kluba personālam ir tiesības
                  pieprasīt, lai apmeklētājs nekavējoties pamet telpas, kā arī piemērot naudas sodu
                  50 EUR apmērā un/vai uz noteiktu laiku bloķēt klienta piekļuvi klubam vai
                  vienpusēji izbeigt līgumu. Šādos gadījumos samaksātās maksas par abonementu vai
                  vienreizēju apmeklējumu netiek atmaksātas.
                </li>
                <li>
                  Sporta klubam ir tiesības pieprasīt no apmeklētāja pilnu atlīdzību par
                  materiālajiem zaudējumiem, kas radušies apmeklētāja rīcības vai nolaidības
                  rezultātā, tostarp par bojātu inventāru, telpām vai citu kluba īpašumu.
                  Kompensācijas apmērs tiek noteikts atbilstoši faktiskajiem zaudējumiem.
                </li>
              </ol>
            </li>

            <li>
              <h2 className="mb-3 text-xl font-medium text-accent">
                Cenrādis un naudas atgriešanas noteikumi
              </h2>
              <ol className="list-decimal space-y-3 pl-5">
                <li>
                  Lielās zāles abonements ir pieejams uz 24 stundu periodu par 10 eiro, 31 dienu
                  periodu par 59 eiro un gada periodu par 590 eiro.
                </li>
                <li>
                  Privātās zāles tarifs ir 15 eiro/stundā. Ir iespējams veikt vairākas rezervācijas
                  ar vienu maksājumu.
                </li>
                <li>
                  Naudas atgriešana, atceļot apmeklējumu, netiek veikta, taču, kā minēts punktā
                  3.13, klientam ir tiesības saņemt atlaidi/kuponu atceltā apmeklējuma vērtībā, ja
                  klients atcēlis apmeklējumu atbilstoši 3.13 punktā minētajam.
                </li>
                <li>Rezervācija tiek veikta ar priekšapmaksu, apmaksājot tīmekļa lapā.</li>
              </ol>
            </li>

            <li>
              <h2 className="mb-3 text-xl font-medium text-accent">Atbildība</h2>
              <ol className="list-decimal space-y-3 pl-5">
                <li>
                  Sporta klubs ir atbildīgs par klientu, un klientam ir tiesības izmantot tiesiskās
                  aizsardzības līdzekļus pret sporta klubu tikai tad, ja sporta klubs tīši vai
                  rupjas nolaidības dēļ ir pārkāpis savas saistības. Atbildības ierobežojums
                  neattiecas uz gadījumiem, kad tiek izraisīta nāve vai nodarīti veselības bojājumi.
                </li>
              </ol>
            </li>

            <li>
              <h2 className="mb-3 text-xl font-medium text-accent">
                Piemērojamie likumi un strīdu risināšana
              </h2>
              <ol className="list-decimal space-y-3 pl-5">
                <li>
                  Gadījumos, kas nav regulēti noteikumos, sporta klubs un klients ievēros Latvijas
                  Republikas spēkā esošo likumdošanu.
                </li>
                <li>
                  Visi strīdi, kas izriet no līguma vai ar to saistīti, tiks risināti sarunu ceļā,
                  un nepārtrauktu domstarpību gadījumā strīdi tiks risināti tiesā saskaņā ar
                  Latvijas Republikas spēkā esošo likumdošanu.
                </li>
              </ol>
            </li>
          </ol>
        </div>
      </div>
    </Main>
  );
};

export default Page;
