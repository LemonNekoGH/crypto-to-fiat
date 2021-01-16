<template>
  <v-container style="height: 100vh">
    <v-row align="center" justify="center" style="height: 100vh">
      <v-col cols="8" style="min-height: 50vh">
        <v-card outlined>
          <v-card-subtitle>转换前</v-card-subtitle>
          <v-card-text>
            <source-currency-field @convert="doConvert" :data="source"></source-currency-field>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-subtitle>转换后</v-card-subtitle>
          <v-card-text>
            <target-currency-field
                v-for="(target, index) in targets"
                :key="index"
                :data="target"
                @removeTarget="removeTarget(target)"
            ></target-currency-field>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn outlined text @click="addTarget" color="primary">{{ $t("addTarget") }}</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script lang="ts">
import Vue from "vue"
import SourceCurrencyField from "@/components/SourceCurrencyField.vue";
import TargetCurrencyField from "@/components/TargetCurrencyField.vue";
import {TargetCurrencyData} from "@/types";
import {getPrice} from "@limestonefi/api";
import {BigNumber} from "bignumber.js";
import {converter, ResultData} from "@lemonneko/currency-converter";

export default Vue.extend({
  name: "Home",
  components: {
    "source-currency-field": SourceCurrencyField,
    "target-currency-field": TargetCurrencyField
  },
  data() {
    return {
      targets: [{
        target: "selectCurrency",
        value: "0",
        error: false,
        errorLabel: this.$t(""),
        defaultLabel: this.$t("convertedValue"),
        converting: false
      }],
      source: {
        source: "selectCurrency",
        value: "",
        error: false,
        defaultLabel: this.$t('typeTheValue'),
        errorLabel: this.$t("sourceIsNotSelected")
      }
    }
  },
  computed: {},
  methods: {
    addTarget() {
      this.targets.push({
        target: "selectCurrency",
        value: "0",
        error: false,
        errorLabel: this.$t(""),
        defaultLabel: this.$t("convertedValue"),
        converting: false
      })
    },
    removeTarget(target: TargetCurrencyData) {
      const local = this.targets
      local.splice(local.indexOf(target), 1)
    },
    doConvert() {
      if (this.source.source == "selectCurrency") {
        this.source.error = true
        this.source.errorLabel = this.$t("sourceIsNotSelected")
        return
      } else if (this.source.value == "") {
        this.source.error = true
        this.source.errorLabel = this.$t("sourceIsEmpty")
        return
      } else {
        this.source.error = false
      }
      this.targets.forEach((target) => {
        if (target.target == "selectCurrency") {
          target.error = true
          target.errorLabel = this.$t("targetIsNotSelected")
        } else {
          target.defaultLabel = this.$t("converting")
          target.error = false
          target.converting = true
        }
      })
      getPrice("AR").then((data) => {
        const arToUSD = new BigNumber(data.price)
        const sourceValue = new BigNumber(this.source.value)

        this.targets.forEach((target) => {
          if (target.target == "selectCurrency") {
            return
          }
          if (target.target === "USD") {
            target.value = arToUSD.times(sourceValue).toFixed(12)
            target.defaultLabel = this.$t("convertedValue")
            target.converting = false
          } else {
            converter.convert({
              to: "CNY",
              from: "USD",
              amount: "1"
            }).then((res: ResultData) => {
              const result = new BigNumber(res.result)
              target.value = result.times(arToUSD).times(sourceValue).toFixed(12)
              target.converting = false
              target.defaultLabel = this.$t("convertedValue")
            })

          }
        })
      }).catch((error) => {
        console.log(error.message)
      })
    }
  }
})
</script>
<style>
.v-input__prepend-outer {
  margin-top: 0 !important;
}

.v-input__append-outer {
  margin-top: 0 !important;
}

.v-card__text {
  padding-bottom: 0 !important;
}
</style>
