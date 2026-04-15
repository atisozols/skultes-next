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
            Privātuma politika
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
                  Šī Privātuma politika attiecas uz SIA &quot;Ozols sporta klubs&quot;, reģ. Nr.
                  41203062733, veikto datu apstrādi (turpmāk — Ozols sporta klubs).
                </li>
                <li>
                  Ozols sporta klubam ir svarīgi nodrošināt pienācīgu personas datu aizsardzību, kas
                  balstīta uz Vispārīgās datu aizsardzības regulas Nr. 679/2016 (VDAR) noteiktajiem
                  principiem, tostarp caurskatāmību, likumību un godprātību.
                </li>
                <li>
                  Šī Privātuma politika ir attiecināma uz datu apstrādi, kas tiek veikta lapā
                  https://www.ozols.club/, ko pārvalda Ozols sporta klubs.
                </li>
                <li>
                  Detalizētāku informāciju par mūsu veikto personas datu apstrādi iespējams saņemt,
                  iesniedzot mums datu subjekta pieprasījumu. Sīkāku informāciju par to, kā izmantot
                  savas datu subjekta tiesības, kā arī mūsu kontaktinformāciju var aplūkot šīs
                  Privātuma politikas 3., 4. un 5. sadaļā.
                </li>
              </ol>
            </li>

            <li>
              <h2 className="mb-3 text-xl font-medium text-accent">Definīcijas</h2>
              <ol className="list-decimal space-y-3 pl-5">
                <li>
                  <span className="font-medium">Datu apstrādātājs</span> ir jebkura persona, kas
                  Ozols sporta klubs vārdā veic personas datu apstrādi.
                </li>
                <li>
                  <span className="font-medium">Datu pārzinis</span> ir jebkura persona, kas nosaka
                  personas datu apstrādes mērķus un līdzekļus. Personas datu apstrādē Ozols sporta
                  klubs darbojas kā datu pārzinis.
                </li>
                <li>
                  <span className="font-medium">Datu subjekts</span> ir jebkura identificējama
                  fiziska persona, kuras personas datus apstrādā Ozols sporta klubs.
                </li>
                <li>
                  <span className="font-medium">Lietotājs</span> ir jebkura fiziska persona, kas
                  izmanto Ozols sporta klubs pakalpojumus vai ir citā veidā saistīta ar to
                  lietošanu.
                </li>
                <li>
                  <span className="font-medium">Personas dati</span> ir jebkura informācija, kas
                  tieši vai netieši identificē datu subjektu.
                </li>
                <li>
                  <span className="font-medium">Piemērojamie tiesību akti</span> ietver Ozols sporta
                  klubs datu aizsardzības regulu un citus saistošus datu aizsardzības likumus.
                </li>
                <li>
                  <span className="font-medium">Saņēmējs</span> ir persona, kurai Ozols sporta klubs
                  ir tiesīga izpaust personas datus.
                </li>
              </ol>
            </li>

            <li>
              <h2 className="mb-3 text-xl font-medium text-accent">
                Kāda veida personas datus mēs apstrādājam?
              </h2>
              <ol className="list-decimal space-y-3 pl-5">
                <li>
                  <span className="font-medium">Personiskus datus:</span> vārdu un uzvārdu.
                </li>
                <li>
                  <span className="font-medium">Kontaktinformāciju:</span> tālruņa numuru, e-pasta
                  adresi, dzīvesvietas adresi, saziņas valodu.
                </li>
                <li>
                  <span className="font-medium">Drošības kameras ierakstus:</span> drošības kameru
                  ierakstus, kas tiek veikti sporta kluba apmeklētāju un īpašuma aizsardzībai.
                </li>
                <li>
                  <span className="font-medium">Ienākošo un izejošo e-pasta saraksti:</span>{' '}
                  saraksti ar klientiem un potenciālajiem klientiem.
                </li>
                <li>
                  <span className="font-medium">Pakalpojuma datus:</span> tie ir dati, kas atspoguļo
                  Jūsu rīcību attiecībā pret mūsu pakalpojumu izmantošanu, piemēram, par Jūsu Ozols
                  sporta klubs iegādātajiem pakalpojumiem un produktiem, dati par Jūsu
                  apmeklējumiem.
                </li>
                <li>
                  <span className="font-medium">Identifikācijas fotogrāfiju</span> (pēc brīvprātīgas
                  augšupielādes): portretfoto, ko klients augšupielādē, lai nodrošinātu konta
                  verifikāciju. Foto tiek izmantots vienīgi klienta identifikācijai kluba
                  apmeklējuma laikā un tiek glabāts šifrētā privātā krātuvē. Fotogrāfiju apstrādā
                  tikai kluba personāls.
                </li>
                <li>
                  <span className="font-medium">Atlaides dokumentus</span> (pēc brīvprātīgas
                  augšupielādes): studentu apliecību, ISIC karti, izziņu no skolas vai pensionāra
                  apliecību, ko klients augšupielādē, lai saņemtu 40% atlaidi. Šie dokumenti tiek
                  izmantoti vienīgi atlaides tiesību pārbaudei un tiek glabāti šifrētā privātā
                  krātuvē. Dokumentus apstrādā tikai kluba personāls.
                </li>
              </ol>
            </li>

            <li>
              <h2 className="mb-3 text-xl font-medium text-accent">Kā mēs ievācam Jūsu datus?</h2>
              <ol className="list-decimal space-y-3 pl-5">
                <li>
                  Kad lietotājs izmanto Ozols sporta klubs vietni vai ievada tajās informāciju.
                </li>
                <li>Kad tiek izmantoti Ozols sporta klubs pakalpojumi.</li>
                <li>
                  Ja Jūs sazināties ar mums klientu apkalpošanas nolūkos (piemēram, ja sastopaties
                  ar tehniskām problēmam).
                </li>
                <li>Ja Jūs piesakāties kā dalībnieks mūsu organizētos pasākumos.</li>
                <li>Ja Jūs apmeklējat pasākumus, ko organizē Ozols sporta klubs.</li>
                <li>Autentifikācijas nolūkā (piemēram, lai apstiprinātu lietotāja kontu).</li>
                <li>
                  Ja Jūs brīvprātīgi augšupielādējat identifikācijas fotogrāfiju vai atlaides
                  dokumentus, izmantojot ozols.club lietotni.
                </li>
              </ol>

              <p className="mt-4">
                Ozols sporta klubs apstrādā personas datus tikai konkrētiem un tiesiskiem mērķiem un
                tikai, ja tas nepieciešams mērķa izpildei. Personas datu apstrādes tiesiskie pamati
                ir:
              </p>
              <ol className="mt-3 list-decimal space-y-3 pl-5">
                <li>
                  <span className="font-medium">
                    Līguma noslēgšana un izpilde (VDAR 6. panta 1. punkta b) apakšpunkts):
                  </span>{' '}
                  Mēs apstrādājam Jūsu personas datus, lai noslēgtu un izpildītu līgumus ar Jums,
                  piemēram, sniedzot Jums pakalpojumus.
                </li>
                <li>
                  <span className="font-medium">
                    Datu subjekta piekrišana (VDAR 6. panta 1. punkta a) apakšpunkts):
                  </span>{' '}
                  Dažos gadījumos mēs varam lūgt Jūsu piekrišanu personas datu apstrādei, piemēram,
                  lai nosūtītu Jums jaunumus un piedāvājumus, kā arī apstrādājot brīvprātīgi
                  augšupielādētu identifikācijas fotogrāfiju vai atlaides dokumentus.
                </li>
                <li>
                  <span className="font-medium">
                    Likumā noteikta pienākuma izpilde (VDAR 6. panta 1. punkta c) apakšpunkts):
                  </span>{' '}
                  Mēs apstrādājam Jūsu personas datus, lai izpildītu mums piemērojamos likumus un
                  noteikumus, piemēram, grāmatvedības un nodokļu likumus.
                </li>
              </ol>

              <div className="mt-4">
                <p className="font-medium">Personas datu kategorijas</p>
                <ol className="mt-2 list-decimal space-y-2 pl-5">
                  <li>Identifikācijas dati: vārds, uzvārds, personas kods (ja nepieciešams).</li>
                  <li>Kontaktinformācija: telefona numurs, e-pasta adrese.</li>
                  <li>
                    Apmeklējuma dati: apmeklējuma datumi un laiki, rezervācijas, izmantotie
                    pakalpojumi, treniņu grafiks.
                  </li>
                  <li>
                    Drošības dati: video novērošanas ieraksti, piekļuves un ieejas reģistri,
                    incidentu fiksācijas ieraksti.
                  </li>
                  <li>
                    Verifikācijas dati: identifikācijas fotogrāfija un/vai atlaides dokumenti
                    (tikai, ja klients tos brīvprātīgi augšupielādē).
                  </li>
                </ol>
              </div>

              <div className="mt-4">
                <p>Ozols sporta klubs datus var nodot:</p>
                <ol className="mt-2 list-decimal space-y-2 pl-5">
                  <li>
                    Pilnvarotām trešajām pusēm (IT pakalpojumu sniedzēji, juridiskie konsultanti
                    u.c.).
                  </li>
                  <li>Valsts iestādēm, ja tas ir juridiski pamatoti.</li>
                </ol>
              </div>

              <div className="mt-4">
                <p className="font-medium">Informācijas uzglabāšanas termiņš</p>
                <ol className="mt-2 list-decimal space-y-2 pl-5">
                  <li>
                    Mēs glabājam Jūsu personas datus tik ilgi, cik tas nepieciešams, lai sasniegtu
                    datu apstrādes mērķus, vai tik ilgi, cik to nosaka likums.
                  </li>
                  <li>
                    Identifikācijas fotogrāfija tiek glabāta, kamēr klients izmanto kluba
                    pakalpojumus vai līdz brīdim, kad klients pieprasa tās dzēšanu.
                  </li>
                  <li>
                    Atlaides dokumenti tiek dzēsti pēc pārbaudes pabeigšanas vai ne vēlāk kā 90
                    dienas pēc augšupielādes.
                  </li>
                </ol>
              </div>
            </li>

            <li>
              <h2 className="mb-3 text-xl font-medium text-accent">Datu subjektu tiesības</h2>
              <p className="mb-3">Jums ir šādas tiesības attiecībā uz Jūsu personas datiem:</p>
              <ol className="list-decimal space-y-3 pl-5">
                <li>
                  <span className="font-medium">Tiesības piekļūt datiem:</span> Jums ir tiesības
                  saņemt apstiprinājumu par to, vai mēs apstrādājam Jūsu personas datus, un, ja tā,
                  tad piekļūt šiem datiem un saņemt informāciju par datu apstrādi.
                </li>
                <li>
                  <span className="font-medium">Tiesības labot datus:</span> Ja Jūsu personas dati
                  ir neprecīzi vai nepilnīgi, Jums ir tiesības pieprasīt to labošanu.
                </li>
                <li>
                  <span className="font-medium">
                    Tiesības dzēst datus (&quot;tiesības tikt aizmirstam&quot;):
                  </span>{' '}
                  Jums ir tiesības pieprasīt Jūsu personas datu dzēšanu, ja tie vairs nav
                  nepieciešami datu apstrādes mērķiem, Jūs atsaucat savu piekrišanu datu apstrādei,
                  Jūs iebilstat pret datu apstrādi, vai datu apstrāde ir nelikumīga.
                </li>
                <li>
                  <span className="font-medium">Tiesības ierobežot datu apstrādi:</span> Jums ir
                  tiesības pieprasīt Jūsu personas datu apstrādes ierobežošanu, ja Jūs apstrīdat
                  datu precizitāti vai datu apstrāde ir nelikumīga.
                </li>
                <li>
                  <span className="font-medium">Tiesības uz datu pārnesamību:</span> Jums ir
                  tiesības saņemt Jūsu personas datus strukturētā, plaši izmantotā un mašīnlasāmā
                  formātā un nodot tos citam datu pārzinim.
                </li>
              </ol>
              <p className="mt-3">
                Lai īstenotu savas datu subjekta tiesības, lūdzu, sazinieties ar mums, izmantojot 9.
                sadaļā norādīto kontaktinformāciju.
              </p>
            </li>

            <li>
              <h2 className="mb-3 text-xl font-medium text-accent">
                Drošības kameru izmantošana sporta klubos
              </h2>
              <p className="mb-3">
                Mēs izmantojam drošības kameras, lai aizsargātu cilvēkus (t.i., klientus un
                darbiniekus) un īpašumu Ozols sporta klubā.
              </p>
              <p className="mb-3">
                Drošības kameras sporta zālēs ir izkārtotas tā, lai novērošanas zonā tiktu iekļauta
                garderobju ieejas, treniņu zāle, ieeja studijā.
              </p>
              <ul className="list-disc space-y-2 pl-5">
                <li>Tiesiskais kameru izmantošanas pamatojums: likumīga interese.</li>
                <li>
                  Kam ir pieeja novērošanas sistēmai un ierakstiem: kluba vadītājam, Pakalpojumu
                  vadītājam.
                </li>
                <li>
                  Novērošanas laiks: visu diennakti. Novērošanas veids: ierakstu saglabāšana un
                  novērošana.
                </li>
                <li>
                  Ieraksti atrodas servera telpā esošajā cietajā diskā. Pieeja tikai
                  iepriekšminētajām personām.
                </li>
                <li>
                  Kā persona var iepazīties ar par viņu uzkrātajiem datiem: rakstot uz e-pastu{' '}
                  <a href="mailto:atis@ozols.club" className="underline">
                    atis@ozols.club
                  </a>
                  . Datus uzglabājam tikai 1 mēnesi.
                </li>
              </ul>
            </li>

            <li>
              <h2 className="mb-3 text-xl font-medium text-accent">Kā ar mums sazināties?</h2>
              <p className="mb-3">
                Ja saistībā ar saviem personas datiem vai tiesību aizsardzību vēlaties iegūt papildu
                informāciju, sazinieties ar mums:
              </p>
              <ul className="list-disc space-y-2 pl-5">
                <li>
                  E-pasts:{' '}
                  <a href="mailto:atis@ozols.club" className="underline">
                    atis@ozols.club
                  </a>
                </li>
                <li>Pasta adrese: Brīvības laukums 4, LV-3101, Tukums</li>
              </ul>
              <p className="mt-4">
                Ja uzskatāt, ka ar Jums saistīto personas datu apstrāde ir pretrunā Vispārējās
                personas datu aizsardzības regulas prasībām, Jums ir tiesības sazināties ar Datu
                valsts inspekciju vai tiesu, lai aizsargātu savas tiesības un intereses.
              </p>
            </li>
          </ol>
        </div>
      </div>
    </Main>
  );
};

export default Page;
