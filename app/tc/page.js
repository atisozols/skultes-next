import Main from '../../components/layout/Main';
import Link from 'next/link';

<li>
  <h2 className="mb-3 text-xl font-medium text-accent">Privātuma politika</h2>
  <ol className="list-decimal space-y-3 pl-5">
    <li>
      Sporta klubs nedrīkst atklāt jebkādu informāciju par Klientu, apmeklējumiem, rezervācijām un
      nosacījumiem trešajām pusēm.
    </li>
    <li>
      Sporta klubs apstrādā savu Klientu personas datus saskaņā ar Vispārīgās datu aizsardzības
      regulas prasībām un citiem piemērojamiem tiesību aktiem un saskaņā ar Privātuma politikas
      nosacījumiem.
    </li>
  </ol>
</li>;

const Page = () => {
  return (
    <Main>
      <div className="container mx-auto max-w-4xl px-4 py-8">
        <div className="mb-8 flex flex-col items-center justify-center">
          <Link href="/" className="mb-6 text-accent hover:underline">
            ← Atpakaļ uz sākumlapu
          </Link>
          <h1 className="bakbak mb-4 text-center text-3xl font-semibold md:text-4xl">Noteikumi</h1>
          <p className="mt-4 text-sm text-alternate">
            Pēdējo reizi atjaunināts: 2025. gada 13. jūnijs
          </p>
        </div>

        <div className="prose-invert prose-accent prose mx-auto max-w-none">
          <ol className="list-decimal space-y-12 pl-5 text-gray-200">
            <li>
              <h2 className="mb-3 text-xl font-medium text-accent">Ievads</h2>
              <ol className="list-decimal space-y-3 pl-5">
                <li>
                  Izmantojot "Ozols" - ozols.club un sporta kluba - pakalpojumus, Klients piekrīt
                  lietošanas noteikumiem, naudas atgriešanas noteikumiem un privātuma politikai
                </li>
              </ol>
            </li>
            <li>
              <h2 className="mb-3 text-xl font-medium text-accent">Reģistrēšanās noteikumi</h2>
              <ol className="list-decimal space-y-3 pl-5">
                <li>
                  Klientam, kurš ir jaunāks par 18 gadiem, vecāki vai likumīgie aizbildņi būs
                  solidāri atbildīgi par visu saistībās noteikto pienākumu izpildi.
                </li>
                <li>
                  Sporta klubam ir tiesības vienpusēji mainīt Noteikumus, sporta kluba darba laiku,
                  cenrādi, rezervācijas noteikumus jebkurā laikā. Ja Klients minētajā laikā
                  rakstiski neinformē sporta klubu par vēlmi izbeigt dalību, sporta zāle uzskatīs,
                  ka Klients piekrīt izmaiņām, un dalība turpināsies ar sporta kluba veiktajām
                  izmaiņām.
                </li>
              </ol>
            </li>
            <li>
              <h2 className="mb-3 text-xl font-medium text-accent">Lietošanas noteikumi</h2>
              <ol className="list-decimal space-y-3 pl-5">
                <li>
                  Klientam ir tiesības izmantot sporta klubu un tajā sniegtos pakalpojumus,
                  pamatojoties uz viņa vienreizējā apmeklējuma vai abonementā noteiktajiem
                  nosacījumiem. Izmantojot sporta klubu, Klientam jāievēro Noteikumos sniegtie
                  norādījumi. Ja kaut kas tiek bojāts, Klients sedz zaudējumus bojātā ekipējuma
                  pilnā vērtībā.
                </li>
                <li>
                  Pakalpojumus sporta klubā var sniegt tikai personas, kuras ir pilnvarojusi sporta
                  kluba administrācija. Dalībniekam nav atļauts sniegt nekādus pakalpojumus sporta
                  zālē (t.sk., bet ne tikai, treniņu, konsultēšanas, vadlīniju sniegšanas) trešajām
                  personām (t.sk. citiem Dalībniekiem) bez rakstiskas sporta kluba atļaujas.
                </li>
                <li>
                  Izvēloties un izmantojot sporta klubā sniegtos pakalpojumus, Dalībniekam pašam vai
                  ar kompetentas personas palīdzību jāuzrauga sava fiziskā labklājība un
                  jākonsultējas ar ārstu pie mazākām aizdomām vai jebkādu simptomu parādīšanās.
                </li>
                <li>
                  Sporta klubu individuāli var izmantot personas, kas vecākas par 15 gadiem.
                  Personas vecumā no 12 līdz 15 gadiem drīkst izmantot sporta zāli tikai pieaugušā
                  pavadībā. Drošības apsvērumu dēļ personām, kas jaunākas par 15 gadiem, nav atļauts
                  apmeklēt sporta klubu, neievērojot iepriekš minētos nosacījumus.
                </li>
                <li>
                  Sporta klubam ir tiesības jebkurā laikā atcelt plānotos treniņus ārkārtas iemeslu
                  dēļ.
                </li>
                <li>
                  Ja Klients ir pārkāpis sporta kluba Noteikumus, sporta klubam ir tiesības atteikt
                  savu saistību izpildi, tostarp atteikt Klienta iekļūšanu sporta klubā vai sniegt
                  pakalpojumus Klientam bez iepriekšēja brīdinājuma Klienta parāda gadījumā, līdz
                  pārkāpums tiek novērsts. Šādā gadījumā Klientam nav tiesību pieprasīt sporta zālei
                  atmaksāt vai samazināt jebkādas Dalībnieka samaksātās maksas.
                </li>
                <li>
                  Sporta kluba pieejamība ir atkarīga no rezervācijas laika. Klienta rezervācijas
                  laikā sporta klubā aizliegts atrasties trešajām pusēm, kas nav saskaņojušas savu
                  dalību ar rezervācijas veicēju - Klientu.
                </li>
                <li>
                  Ja Klients nevar apmeklēt treniņu laikā, kurā veikta rezervācija, Klientam jāatceļ
                  rezervācija. Atceļot rezervāciju vismaz 24 stundu laikā pirms rezervētā laika vai
                  5 minūšu laikā pēc rezervācijas veikšanas, Klients saņem atlaidi nākamajai
                  rezervācijai atceltās rezervācijas vērtībā.
                </li>
                <li>
                  Klients izmantos aprīkojumu mērķtiecīgi un saskaņā ar aprīkojumam paradzēto
                  lietošanu.
                </li>
                <li>
                  Klientam jāievēro labas manieres un jālieto sporta kluba īpašums atbilstoši. Ir
                  aizliegts traucēt citus Klientus ar savu darbību. Sporta klubā ir aizliegts
                  smēķēt, lietot alkoholu vai narkotikas. Sporta klubā nav atļauts ienest
                  mājdzīvniekus. Sporta kluba administrācijai ir tiesības uz laiku atstādināt
                  Klientu no sporta kluba, ja tas pārkāpj jebkuru no iepriekš minētajiem
                  nosacījumiem, vai arī piešķirt Klientam naudas sodu.
                </li>
                <li>
                  Sporta klubam ir tiesības veikt jebkāda veida uzturēšanu, tīrīšanu un remontu
                  sporta klubā un tā aprīkojumā, lai nodrošinātu sporta zāles tīrību un labāko
                  stāvokli. Iespēju robežās Klienti tiks informēti par šādu uzturēšanu savlaicīgi.
                  Klientam ir pienākums neiebilst pret šādu uzturēšanu, neizvirzot prasības sporta
                  klubam par iespējamiem neērtībām, tostarp īslaicīgu nespēju izmantot sporta
                  klubam.
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
                  Naudas atgriešana, atceļot apmeklējumu, netiek veikta, taču, kā minēts punktā 3.8,
                  Klientam ir tiesības saņemt atlaidi/kuponu atceltā apmeklējuma vērtībā, ja Klients
                  atcēlis apmeklējumu atbilstoši 3.8 punktā minētajam.
                </li>
                <li>Rezervācija tiek veikta ar priekšapmaksu, apmaksājot tīmekļa lapā.</li>
              </ol>
            </li>
            <li>
              <h2 className="mb-3 text-xl font-medium text-accent">Atbildība</h2>
              <ol className="list-decimal space-y-3 pl-5">
                <li>
                  Sporta klubs ir atbildīgs par Klientu, un Klientam ir tiesības izmantot tiesiskās
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
                  Gadījumos, kas nav regulēti Noteikumos, sporta klubs un Klients ievēros Latvijas
                  Republikas spēkā esošo likumdošanu.
                </li>
                <li>
                  Visi strīdi, kas izriet no Līguma vai ar to saistīti, tiks risināti sarunu ceļā,
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
