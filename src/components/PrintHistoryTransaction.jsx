import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  PDFViewer,
} from "@react-pdf/renderer";
import { useLocation } from "react-router-dom";
import moment from "moment";
import formatRupiah from "../utils/formatRupiah";
moment.locale("id");

// Create styles
let textSm = {
  fontSize: "10px",
  padding: "2x 5px",
  fontWeight: "bold",
  textAlign: "left",
  backgroundColor: "#ddf0f6",
};
let borderNotRightSides = {
  borderTopWidth: "1px",
  borderLeftWidth: "1px",
  borderBottomWidth: "1px",
};
let borderNotTopRightSides = {
  borderLeftWidth: "1px",
  borderBottomWidth: "1px",
};
let contentStyle = {
  fontSize: "8px",
  padding: "2x 5px",
  textAlign: "left",
  backgroundColor: "white",
};

const styles = StyleSheet.create({
  page: {
    color: "black",
  },
  headerContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    margin: "10px 10px 0px 10px",
  },
  innerContentContainer: {
    display: "flex",
    flexDirection: "row",
    margin: "0px 10px 0px 10px",
    justifyContent: "space-between",
  },
  textContentNumber: {
    ...contentStyle,
    ...borderNotTopRightSides,
    width: "25px",
  },
  textContentId: {
    ...contentStyle,
    ...borderNotTopRightSides,
    width: "100px",
    flexGrow: "1",
  },
  textContentTotal: {
    ...contentStyle,
    ...borderNotTopRightSides,
    width: "100px",
    flexGrow: "1",
  },
  textContentDate: {
    ...contentStyle,
    borderLeftWidth: "1px",
    borderBottomWidth: "1px",
    borderRightWidth: "1px",
    width: "100px",
    flexGrow: "1",
  },
  textNumber: {
    ...textSm,
    ...borderNotRightSides,
    width: "25px",
  },
  textId: {
    ...textSm,
    ...borderNotRightSides,
    flexGrow: "1",
    width: "100px",
  },
  textTotal: {
    ...textSm,
    ...borderNotRightSides,
    flexGrow: "1",
    width: "100px",
  },
  textDate: {
    ...textSm,
    width: "100px",
    border: "1px solid black",
    flexGrow: "1",
  },
  contentContainer: {
    display: "flex",
    flexDirection: "column",
  },
  headingContainer: {
    display: "flex",
    flexDirection: "column",
    marginTop: "10px",
    marginLeft: "10px",
    fontSize: "12px",
  },
  viewer: {
    width: window.innerWidth, //the pdf viewer will take up all of the width and height
    height: window.innerHeight,
  },
});

// Create Document Component
function PrintHistoryTransaction() {
  let countOrders = 1;
  const location = useLocation();
  const dataOrder = location.state?.ordersData;
  const dateOrder = location.state?.date;
  const totalSalesOrder = location.state?.totalSales;
  return (
    <PDFViewer style={styles.viewer}>
      {/* Start of the document*/}
      <Document>
        {/*render a single page*/}
        <Page size="A4" style={styles.page}>
          {/* header */}
          <View style={styles.headingContainer}>
            <Text>Laporan Penjualan</Text>
            <Text>{`Periode : ${moment(dateOrder?.startDate).format(
              "DD/MM/YYYY"
            )} - ${moment(dateOrder?.endDate).format("DD/MM/YYYY")}`}</Text>
            <Text
              style={{
                marginTop: "5px",
              }}
            >
              Total Penjualan : {`Rp${formatRupiah(totalSalesOrder)}`}
            </Text>
          </View>
          <View style={styles.headerContainer}>
            <Text style={styles.textNumber}>No</Text>
            <Text style={styles.textId}>ID</Text>
            <Text style={styles.textTotal}>Jumlah</Text>
            <Text style={styles.textDate}>Waktu</Text>
          </View>
          {dataOrder.map((elm, idx) => {
            countOrders += idx;
            if (elm.status === "batal") {
              countOrders -= 1;
              return countOrders;
            }
            return (
              <View style={styles.innerContentContainer} key={elm.id}>
                <Text style={styles.textContentNumber}>{countOrders}</Text>
                <Text style={styles.textContentId}>{elm?.id}</Text>
                <Text style={styles.textContentTotal}>
                  Rp{formatRupiah(elm.amount)}
                </Text>
                <Text style={styles.textContentDate}>
                  {moment(elm.createdAt).format("llll")}
                </Text>
              </View>
            );
          })}
        </Page>
      </Document>
    </PDFViewer>
  );
}
export default PrintHistoryTransaction;
